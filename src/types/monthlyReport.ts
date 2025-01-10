import { ReportFormData } from './report';

export interface MonthlyReport {
  id: string;
  month: string;
  year: number;
  items: MonthlyReportItem[];
  totalAmount: number;
}

export interface MonthlyReportItem {
  id: string;
  description: string;
  amount: number;
  date: Date;
  notes: string;
  category: string;
}

export interface MonthlyReportFormData extends ReportFormData {
  category: string;
}