import React, { useState } from 'react';
import { useMessage } from '@/hooks/useMessage';
import { BaseConhecimentoMessage } from '@/components/BaseConhecimentoMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const BaseConhecimento: React.FC = () => {
  const {
    messages,
    isLoading,
    statusMessage,
    currentStreamingMessage,
    sendMessage,
    stopGeneration,
    provideFeedback
  } = useMessage();

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleDownload = (url: string, documentId: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <BaseConhecimentoMessage
            key={msg.id}
            message={msg}
            onFeedback={provideFeedback}
            onDownload={handleDownload}
          />
        ))}

        {isLoading && currentStreamingMessage && (
          <BaseConhecimentoMessage
            message={{
              id: 'streaming',
              content: currentStreamingMessage,
              role: 'assistant',
              status: 'sending',
              timestamp: new Date()
            }}
            onFeedback={() => {}}
          />
        )}
      </div>

      {statusMessage && (
        <div className="p-2 text-sm text-center text-muted-foreground border-t">
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex flex-col gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua solicitação..."
          className="resize-none min-h-[80px]"
        />
        <div className="flex justify-between items-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Gerando...' : 'Enviar'}
          </Button>
          {isLoading && (
            <Button variant="outline" type="button" onClick={stopGeneration}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BaseConhecimento;
