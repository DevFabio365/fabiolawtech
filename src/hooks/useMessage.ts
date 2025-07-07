// hooks/useMessage.ts
import { useState, useCallback, useRef } from 'react';
import { Message, StreamingResponse, DocumentResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  }, []);

  const sendMessage = useCallback(async (content: string, documentType?: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessageId = addMessage({
      content: content.trim(),
      role: 'user',
      status: 'sent'
    });

    // Add assistant message placeholder
    const assistantMessageId = addMessage({
      content: '',
      role: 'assistant',
      status: 'sending'
    });

    setIsLoading(true);
    setCurrentStreamingMessage('');
    setStatusMessage('Processando sua solicitação...');

    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${API_BASE_URL}/generate-document-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          userId: 'user-123', // In real app, get from auth
          documentType: documentType
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data: StreamingResponse = JSON.parse(line.slice(6));
                
                switch (data.type) {
                  case 'status':
                    setStatusMessage(data.data);
                    break;
                  case 'content':
                    fullContent += data.data;
                    setCurrentStreamingMessage(fullContent);
                    updateMessage(assistantMessageId, {
                      content: fullContent,
                      status: 'sending'
                    });
                    break;
                  case 'complete':
                    const finalData = data.data as DocumentResponse;
                    updateMessage(assistantMessageId, {
                      content: fullContent,
                      status: 'sent',
                      documentId: finalData.documentId,
                      downloadUrl: finalData.downloadUrl,
                      documentType: {
                        id: finalData.documentType,
                        name: finalData.documentType,
                        description: '',
                        icon: 'FileText',
                        sections: [],
                        estimatedTime: `${finalData.generationTime}s`
                      }
                    });
                    setStatusMessage('');
                    break;
                  case 'error':
                    throw new Error(data.data);
                }
              } catch (parseError) {
                console.warn('Failed to parse SSE data:', parseError);
              }
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      
      console.error('Error sending message:', error);
      updateMessage(assistantMessageId, {
        content: 'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente.',
        status: 'error'
      });
      setStatusMessage('');
    } finally {
      setIsLoading(false);
      setCurrentStreamingMessage('');
      abortControllerRef.current = null;
    }
  }, [isLoading, addMessage, updateMessage]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setStatusMessage('');
      setCurrentStreamingMessage('');
    }
  }, []);

  const provideFeedback = useCallback(async (messageId: string, feedback: 'like' | 'dislike', comment?: string) => {
    try {
      const message = messages.find(m => m.id === messageId);
      if (!message?.documentId) return;

      await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: message.documentId,
          feedback_type: feedback,
          comment: comment
        })
      });

      updateMessage(messageId, { feedback });
    } catch (error) {
      console.error('Error providing feedback:', error);
    }
  }, [messages, updateMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentStreamingMessage('');
    setStatusMessage('');
  }, []);

  return {
    messages,
    isLoading,
    statusMessage,
    currentStreamingMessage,
    sendMessage,
    stopGeneration,
    provideFeedback,
    clearMessages,
    addMessage,
    updateMessage
  };
};

