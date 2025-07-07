// components/Message.tsx
import React, { useState } from 'react';
import { Message as MessageType } from '../types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Bot, 
  ThumbsUp, 
  ThumbsDown, 
  Download, 
  FileText, 
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BaseConhecimentoMessageProps {
  message: MessageType;
  onFeedback: (messageId: string, feedback: 'like' | 'dislike', comment?: string) => void;
  onDownload?: (url: string, documentId: string) => void;
}

export const BaseConhecimentoMessage: React.FC<BaseConhecimentoMessageProps> = ({ message, onFeedback, onDownload }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const handleFeedback = (type: 'like' | 'dislike') => {
    if (type === 'dislike') {
      setShowFeedbackForm(true);
    } else {
      onFeedback(message.id, type);
    }
  };

  const submitFeedback = () => {
    onFeedback(message.id, 'dislike', feedbackComment);
    setShowFeedbackForm(false);
    setFeedbackComment('');
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />;
      case 'sent':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex gap-3 p-4 group",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col gap-2 max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <Card className={cn(
          "p-4 shadow-sm",
          isUser 
            ? "bg-blue-600 text-white border-blue-600" 
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              {message.content && (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {message.content}
                  </pre>
                </div>
              )}
              
              {message.documentType && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">{message.documentType.name}</span>
                    {message.documentType.estimatedTime && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {message.documentType.estimatedTime}
                      </Badge>
                    )}
                  </div>
                  
                  {message.downloadUrl && (
                    <Button
                      size="sm"
                      onClick={() => onDownload?.(message.downloadUrl!, message.documentId!)}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Documento
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {getStatusIcon()}
            </div>
          </div>
        </Card>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{message.timestamp.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</span>
          
          {isAssistant && message.status === 'sent' && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 w-6 p-0",
                  message.feedback === 'like' && "text-green-600"
                )}
                onClick={() => handleFeedback('like')}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 w-6 p-0",
                  message.feedback === 'dislike' && "text-red-600"
                )}
                onClick={() => handleFeedback('dislike')}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        {showFeedbackForm && (
          <Card className="p-3 w-full">
            <div className="space-y-3">
              <p className="text-sm font-medium">Como podemos melhorar?</p>
              <Textarea
                placeholder="Descreva o que não atendeu suas expectativas..."
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={submitFeedback}>
                  Enviar Feedback
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowFeedbackForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

