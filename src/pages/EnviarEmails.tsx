import React, { useState } from 'react';
import EmailForm from '../components/forms/EmailForm';
import EmailValidation from '../components/email/EmailValidation';
import EmailHistoryList from '../components/email/EmailHistory';
import { EmailData, EmailHistory } from '../types/email';
import { useCustomers } from '../context/CustomerContext';

export default function EnviarEmails() {
  const { customers } = useCustomers();
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [history, setHistory] = useState<EmailHistory[]>([]);

  const handleValidate = (data: EmailData) => {
    setEmailData(data);
  };

  const handleSave = (data: EmailData) => {
    const historyEntry: EmailHistory = {
      id: crypto.randomUUID(),
      emailData: data,
      sentAt: new Date(),
      status: 'saved',
      logs: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          action: 'Saved',
          details: 'Email saved as draft'
        }
      ]
    };

    setHistory([historyEntry, ...history]);
    setEmailData(null);
  };

  const handleSend = async (data: EmailData) => {
    const success = Math.random() > 0.1;

    const historyEntry: EmailHistory = {
      id: crypto.randomUUID(),
      emailData: data,
      sentAt: new Date(),
      status: 'sent',
      logs: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          action: success ? 'Sent' : 'Failed',
          details: success ? 'Email sent successfully' : 'Failed to send email'
        }
      ]
    };

    setHistory([historyEntry, ...history]);
    setEmailData(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Envio de E-mails</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna da Esquerda - Dados do Email */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">
              Dados do E-mail
            </h2>
            <EmailForm
              onValidate={handleValidate}
              customers={customers}
            />
          </div>

          {/* Histórico abaixo dos dados do email */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">
              Histórico de Envios
            </h2>
            <EmailHistoryList 
              history={history}
              onView={() => {}}
            />
          </div>
        </div>

        {/* Coluna da Direita - Validação */}
        <div className="lg:sticky lg:top-6">
          <EmailValidation
            data={emailData}
            onSave={handleSave}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}