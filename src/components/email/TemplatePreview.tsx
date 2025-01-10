import React from 'react';
import { X } from 'lucide-react';

interface TemplatePreviewProps {
  content: string;
  onClose: () => void;
}

export default function TemplatePreview({ content, onClose }: TemplatePreviewProps) {
  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .split('\n').map((line, i) => 
        line.startsWith('- ') ? 
          `<li style="margin-left: 20px;">${line.substring(2)}</li>` : 
          `<p style="margin-bottom: 16px;">${line}</p>`
      ).join('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">Visualização do Template</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div 
              className="text-gray-900 text-base leading-relaxed"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
              dangerouslySetInnerHTML={{ 
                __html: formatContent(content)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}