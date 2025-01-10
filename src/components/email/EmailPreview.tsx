import React from 'react';
import { EmailData } from '../../types/email';
import { getEmailTemplate } from '../../lib/emailTemplates';

interface EmailPreviewProps {
  data: EmailData;
}

export default function EmailPreview({ data }: EmailPreviewProps) {
  const { subject, content } = getEmailTemplate(data);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Para:</p>
          <p className="text-gray-900">{data.email}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Assunto:</p>
          <p className="text-gray-900">{subject}</p>
        </div>

        <hr className="my-4 border-gray-200" />
        
        <div 
          className="text-gray-900 prose max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }}
        />
      </div>
    </div>
  );
}