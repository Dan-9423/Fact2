export type EmailStatus = 'draft' | 'saved' | 'sent';

export interface EmailData {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  phone: string;
  numeroNF: string;
  valorTotal: number;
}

export interface EmailHistory {
  id: string;
  emailData: EmailData;
  sentAt: Date;
  status: EmailStatus;
  logs?: EmailLog[];
}

export interface EmailLog {
  id: string;
  timestamp: Date;
  action: string;
  details: string;
}