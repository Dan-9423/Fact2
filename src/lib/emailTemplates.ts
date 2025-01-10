import { EmailData } from '../types/email';
import { formatCurrency } from './utils';
import { useEmailTemplate } from '../context/EmailTemplateContext';

interface EmailTemplate {
  subject: string;
  content: string;
}

export function getEmailTemplate(data: EmailData): EmailTemplate {
  const { template } = useEmailTemplate();
  
  // Replace template variables
  const replacements = {
    '[[razaoSocial]]': data.razaoSocial,
    '[[numeroNF]]': data.numeroNF,
    '[[valorTotal]]': formatCurrency(data.valorTotal)
  };

  const subject = template.subject.replace(
    /\[\[(.*?)\]\]/g,
    (match) => replacements[match] || match
  );

  const content = template.content.replace(
    /\[\[(.*?)\]\]/g,
    (match) => replacements[match] || match
  );

  return { subject, content };
}