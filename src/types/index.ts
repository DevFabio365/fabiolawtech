// types/index.ts
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  documentType?: DocumentType;
  documentId?: string;
  downloadUrl?: string;
  feedback?: 'like' | 'dislike';
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  sections: string[];
  estimatedTime: string;
}

export interface StreamingResponse {
  type: 'status' | 'content' | 'complete' | 'error';
  data: any;
  timestamp: string;
}

export interface GenerationRequest {
  message: string;
  userId: string;
  documentType?: string;
  templateId?: string;
}

export interface DocumentResponse {
  documentId: string;
  content: string;
  documentType: string;
  templateUsed?: string;
  relevantDocsCount: number;
  generationTime: number;
  downloadUrl?: string;
}

export interface ConversationHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultDocumentType?: string;
  autoSave: boolean;
  notifications: boolean;
}

