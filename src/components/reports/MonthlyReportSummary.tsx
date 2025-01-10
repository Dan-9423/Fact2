import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { MonthlyReport } from '../../types/monthlyReport';
import { formatCurrency } from '../../lib/utils';

interface MonthlyReportSummaryProps {
  report: MonthlyReport;
  onDownload: (report: MonthlyReport) => void;
}

export default function MonthlyReportSummary({ report, onDownload }: MonthlyReportSummaryProps) {
  const categories = [...new Set(report.items.map(item => item.category))];
  
  const getCategoryTotal = (category: string) => {
    return report.items
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">
          {report.month}/{report.year}
        </h3>
        <button
          onClick={() => onDownload(report)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2">
        {categories.map(category => (
          <div
            key={category}
            className="bg-gray-700 p-3 rounded-lg border border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-200">{category}</span>
              </div>
              <span className="text-sm font-medium text-white">
                {formatCurrency(getCategoryTotal(category))}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-200">Total</span>
          <span className="text-lg font-bold text-white">
            {formatCurrency(report.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}