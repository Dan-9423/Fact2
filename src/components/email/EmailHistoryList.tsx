import React from 'react';
import { Eye, FileText } from 'lucide-react';
import { EmailHistory } from '../../types/email';
import { formatCurrency } from '../../lib/utils';

interface EmailHistoryListProps {
  history: EmailHistory[];
  onView: (email: EmailHistory) => void;
}

export default function EmailHistoryList({ history, onView }: EmailHistoryListProps) {
  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div
          key={entry.id}
          className="bg-gray-700 p-4 rounded-lg border border-gray-600"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">
                    {entry.emailData.razaoSocial}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    entry.status === 'draft' ? 'bg-gray-500 text-gray-100' :
                    entry.status === 'saved' ? 'bg-yellow-500 text-yellow-100' :
                    'bg-green-500 text-green-100'
                  }`}>
                    {entry.status === 'draft' ? 'Rascunho' : 
                     entry.status === 'saved' ? 'Salvo' : 'Enviado'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  NF: {entry.emailData.numeroNF} - {formatCurrency(entry.emailData.valorTotal)}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(entry.sentAt).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <button
              onClick={() => onView(entry)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}