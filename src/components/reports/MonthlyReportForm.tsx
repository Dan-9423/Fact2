import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MonthlyReportFormData } from '../../types/monthlyReport';
import { formatCurrency } from '../../lib/utils';

const monthlyReportSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  date: z.string().min(1, 'Data é obrigatória'),
  notes: z.string(),
  category: z.string().min(1, 'Categoria é obrigatória'),
});

const categories = [
  'Despesas Fixas',
  'Despesas Variáveis',
  'Investimentos',
  'Receitas',
  'Outros',
];

interface MonthlyReportFormProps {
  onSubmit: (data: MonthlyReportFormData) => void;
  initialData?: Partial<MonthlyReportFormData>;
}

export default function MonthlyReportForm({ onSubmit, initialData }: MonthlyReportFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MonthlyReportFormData>({
    resolver: zodResolver(monthlyReportSchema),
    defaultValues: initialData,
  });

  const amount = watch('amount');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200">
          Categoria
        </label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Descrição
        </label>
        <input
          type="text"
          {...register('description')}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Valor
        </label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
        )}
        {amount && (
          <p className="mt-1 text-sm text-gray-400">
            {formatCurrency(amount)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Data
        </label>
        <input
          type="date"
          {...register('date')}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Observações
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Adicionar Item
      </button>
    </form>
  );
}