import React, { useState } from 'react';
import ReportForm from '../components/reports/ReportForm';
import ReportList from '../components/reports/ReportList';
import { WeeklyReport, ReportFormData } from '../types/report';

export default function ContasSemanais() {
  const [reports, setReports] = useState<WeeklyReport[]>([]);

  const handleSubmit = (data: ReportFormData) => {
    const newReport: WeeklyReport = {
      id: crypto.randomUUID(),
      description: data.description,
      amount: data.amount,
      date: new Date(data.date),
      notes: data.notes,
    };

    setReports([newReport, ...reports]);
  };

  const handleDownload = (report: WeeklyReport) => {
    // TODO: Implement PDF generation and download
    console.log('Downloading report:', report);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Contas Semanais</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Novo Relatório
          </h2>
          <ReportForm onSubmit={handleSubmit} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Relatórios Gerados
          </h2>
          <ReportList reports={reports} onDownload={handleDownload} />
        </div>
      </div>
    </div>
  );
}