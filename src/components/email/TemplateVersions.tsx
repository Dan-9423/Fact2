import React, { useState } from 'react';
import { Clock, ArrowUpRightFromCircle, Eye, Trash2, X } from 'lucide-react';
import { EmailTemplateVersion } from '../../types/emailTemplate';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TemplateVersionsProps {
  versions: EmailTemplateVersion[];
  onRestore: (version: EmailTemplateVersion) => void;
  onDelete: (versionId: string) => void;
}

export default function TemplateVersions({ versions, onRestore, onDelete }: TemplateVersionsProps) {
  const [previewVersion, setPreviewVersion] = useState<EmailTemplateVersion | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Histórico de Versões</h3>
      
      {previewVersion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">{previewVersion.version}</h3>
              <button
                onClick={() => setPreviewVersion(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-2">
                {previewVersion.description}
              </p>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-lg text-gray-100 text-sm leading-relaxed">
                  {previewVersion.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {versions.map((version) => (
          <div
            key={version.id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-white">{version.version}</p>
                <p className="text-sm text-gray-300">{version.description}</p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(version.createdAt), { 
                    addSuffix: true,
                    locale: ptBR 
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPreviewVersion(version)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Visualizar"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => onRestore(version)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Restaurar esta versão"
              >
                <ArrowUpRightFromCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(version.id)}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Excluir"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}