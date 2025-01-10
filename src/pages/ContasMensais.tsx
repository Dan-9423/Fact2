import React, { useState } from 'react';
import MonthlyReportForm from '../components/reports/MonthlyReportForm';
import MonthlyReportSummary from '../components/reports/MonthlyReportSummary';
import { MonthlyReport, MonthlyReportFormData } from '../types/monthlyReport';

export default function ContasMensais() {
  const [currentReport, setCurrentReport] = useState<MonthlyReport>({
    id: crypto.randomUUID(),
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    items: [],
    totalAmount: 0,
  });

  const handleSubmit = (data: MonthlyReportFormData) => {
    const newItem = {
      id: crypto.randomUUID(),
      description: data.description,
      amount: data.amount,
      date: new Date(data.date),
      notes: data.notes,
      category: data.category,
    };

    const updatedItems = [...currentReport.items, newItem];
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.amount, 0);

    setCurrentReport({
      ...currentReport,
      items: updatedItems,
      totalAmount,
    });
  };

  const handleDownload = (report: MonthlyReport) => {
    // TODO: Implement PDF generation and download
    console.log('Downloading monthly report:', report);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Contas Mensais</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Novo Item
          </h2>
          <MonthlyReportForm onSubmit={handleSubmit} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Resumo do Mês
          </h2>
          <MonthlyReportSummary
            report={currentReport}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  );
}