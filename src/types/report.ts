export interface WeeklyReport {
  id: string;
  description: string;
  amount: number;
  date: Date;
  notes: string;
}

export interface ReportFormData {
  description: string;
  amount: number;
  date: string;
  notes: string;
}