import React from 'react';
import { FileText, Download } from 'lucide-react';
import { WeeklyReport } from '../../types/report';
import { formatCurrency } from '../../lib/utils';

interface ReportListProps {
  reports: WeeklyReport[];
  onDownload: (report: WeeklyReport) => void;
}

export default function ReportList({ reports, onDownload }: ReportListProps) {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-gray-700 p-4 rounded-lg border border-gray-600 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-medium text-white">{report.description}</h3>
              <p className="text-sm text-gray-400">
                {report.date.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-300">
                {formatCurrency(report.amount)}
              </p>
            </div>
          </div>
          <button
            onClick={() => onDownload(report)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}