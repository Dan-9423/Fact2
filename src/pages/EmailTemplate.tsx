import React, { useState } from 'react';
import { Save, Edit, X, Eye } from 'lucide-react';
import { useEmailTemplate } from '../context/EmailTemplateContext';
import TemplateEditor from '../components/email/TemplateEditor';
import TemplateVersions from '../components/email/TemplateVersions';
import TemplatePreview from '../components/email/TemplatePreview';

export default function EmailTemplate() {
  const { template, currentVersion, versions, updateTemplate, restoreVersion, deleteVersion } = useEmailTemplate();
  const [editedTemplate, setEditedTemplate] = useState(template);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  const handleSave = () => {
    if (description.trim()) {
      updateTemplate(editedTemplate, description);
      setIsEditing(false);
      setDescription('');
    }
  };

  const handleCancel = () => {
    setEditedTemplate(template);
    setIsEditing(false);
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Template de E-mail</h1>
          <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
            {currentVersion}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Eye className="h-5 w-5" />
            Visualizar Template
          </button>
          {isEditing ? (
            <>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva as alterações..."
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!description.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                Salvar Alterações
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-5 w-5" />
              Editar Template
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6">
            <p className="text-sm text-gray-400 mb-4">
              Use as variáveis entre colchetes duplos para dados dinâmicos: [[razaoSocial]], [[numeroNF]], [[valorTotal]]
            </p>
            {isEditing ? (
              <TemplateEditor
                value={editedTemplate}
                onChange={setEditedTemplate}
              />
            ) : (
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-lg text-gray-100 text-sm leading-relaxed">
                  {template}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <TemplateVersions
            versions={versions}
            onRestore={(version) => {
              restoreVersion(version);
              setIsEditing(false);
            }}
            onDelete={deleteVersion}
          />
        </div>
      </div>

      {showPreview && (
        <TemplatePreview
          content={template}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}