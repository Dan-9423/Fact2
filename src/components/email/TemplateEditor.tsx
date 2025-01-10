import React from 'react';
import { Bold, Italic, List } from 'lucide-react';

interface TemplateEditorProps {
  value: {
    subject: string;
    content: string;
  };
  onChange: (value: { subject: string; content: string }) => void;
}

export default function TemplateEditor({ value, onChange }: TemplateEditorProps) {
  const handleFormat = (format: string) => {
    const textarea = document.querySelector('#template-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.content.substring(start, end);
    
    let newContent = value.content;
    switch (format) {
      case 'bold':
        newContent = value.content.substring(0, start) + `**${selectedText}**` + value.content.substring(end);
        break;
      case 'italic':
        newContent = value.content.substring(0, start) + `_${selectedText}_` + value.content.substring(end);
        break;
      case 'list':
        const lines = selectedText.split('\n').map(line => `- ${line}`);
        newContent = value.content.substring(0, start) + lines.join('\n') + value.content.substring(end);
        break;
    }
    
    onChange({ ...value, content: newContent });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Assunto do E-mail
        </label>
        <input
          type="text"
          value={value.subject}
          onChange={(e) => onChange({ ...value, subject: e.target.value })}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o assunto do e-mail..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Conteúdo do E-mail
        </label>
        <div className="flex gap-2 bg-gray-700 p-2 rounded-t-lg border-b border-gray-600">
          <button
            onClick={() => handleFormat('bold')}
            className="p-2 hover:bg-gray-600 rounded"
            title="Negrito"
          >
            <Bold className="h-4 w-4 text-gray-200" />
          </button>
          <button
            onClick={() => handleFormat('italic')}
            className="p-2 hover:bg-gray-600 rounded"
            title="Itálico"
          >
            <Italic className="h-4 w-4 text-gray-200" />
          </button>
          <button
            onClick={() => handleFormat('list')}
            className="p-2 hover:bg-gray-600 rounded"
            title="Lista"
          >
            <List className="h-4 w-4 text-gray-200" />
          </button>
        </div>
        <textarea
          id="template-editor"
          value={value.content}
          onChange={(e) => onChange({ ...value, content: e.target.value })}
          className="h-[400px] w-full p-4 bg-gray-700 border border-gray-600 rounded-b-lg text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}