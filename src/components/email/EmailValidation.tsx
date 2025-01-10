import React from 'react';
import { EmailData } from '../../types/email';
import EmailPreview from './EmailPreview';

interface EmailPreviewContainerProps {
  data: EmailData | null;
  onSave: (data: EmailData) => void;
  onSend: (data: EmailData) => void;
}

export default function EmailPreviewContainer({ data, onSave, onSend }: EmailPreviewContainerProps) {
  if (!data) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">Visualização do E-mail</h2>
      
      <div className="space-y-6">
        <EmailPreview data={data} />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => onSave(data)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Salvar Rascunho
          </button>
          <button
            onClick={() => onSend(data)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Enviar E-mail
          </button>
        </div>
      </div>
    </div>
  );
}