import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CustomerFormData } from '../../types/customer';
import { formatCNPJInput, formatPhoneInput } from '../../lib/masks';

const customerSchema = z.object({
  razaoSocial: z.string().min(1, 'Razão Social é obrigatória'),
  nomeFantasia: z.string().min(1, 'Nome Fantasia é obrigatório'),
  cnpj: z.string().length(18, 'CNPJ inválido'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(15, 'Telefone inválido'),
});

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: CustomerFormData;
}

export default function CustomerForm({ onSubmit, initialData }: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof CustomerFormData, value);
      });
    }
  }, [initialData, setValue]);

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJInput(e.target.value);
    setValue('cnpj', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setValue('phone', formatted);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Razão Social
          </label>
          <input
            type="text"
            {...register('razaoSocial')}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Digite a razão social"
          />
          {errors.razaoSocial && (
            <p className="text-sm text-red-500">{errors.razaoSocial.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Nome Fantasia
          </label>
          <input
            type="text"
            {...register('nomeFantasia')}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Digite o nome fantasia"
          />
          {errors.nomeFantasia && (
            <p className="text-sm text-red-500">{errors.nomeFantasia.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            CNPJ
          </label>
          <input
            type="text"
            {...register('cnpj')}
            onChange={handleCNPJChange}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="00.000.000/0000-00"
            maxLength={18}
          />
          {errors.cnpj && (
            <p className="text-sm text-red-500">{errors.cnpj.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Telefone
          </label>
          <input
            type="text"
            {...register('phone')}
            onChange={handlePhoneChange}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          E-mail
        </label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="exemplo@empresa.com.br"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
        >
          {initialData ? 'Atualizar' : 'Cadastrar'} Sacado
        </button>
      </div>
    </form>
  );
}