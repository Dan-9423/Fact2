import React from 'react';
import { BarChart, Users, Mail, FileText } from 'lucide-react';

export default function Home() {
  const stats = [
    { icon: Users, label: 'Total de Sacados', value: '150' },
    { icon: Mail, label: 'E-mails Enviados', value: '1,234' },
    { icon: FileText, label: 'Relatórios Gerados', value: '89' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <stat.icon className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm text-white">Relatório gerado</p>
                  <p className="text-xs text-gray-400">Há 2 horas</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">E-mails Pendentes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-white">Empresa {index + 1}</p>
                    <p className="text-xs text-gray-400">NF #123{index}</p>
                  </div>
                </div>
                <button className="text-xs text-blue-500 hover:text-blue-400">
                  Enviar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}