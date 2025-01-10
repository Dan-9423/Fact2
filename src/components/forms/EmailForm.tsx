import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { EmailData } from '../../types/email';
import { Customer } from '../../types/customer';
import CurrencyInput from '../ui/CurrencyInput';

const emailSchema = z.object({
  razaoSocial: z.string().min(1, 'Razão Social é obrigatória'),
  nomeFantasia: z.string().min(1, 'Nome Fantasia é obrigatório'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  numeroNF: z.string().min(1, 'Número da NF é obrigatório'),
  valorTotal: z.number().min(0.01, 'Valor deve ser maior que zero'),
});

interface EmailFormProps {
  onValidate: (data: EmailData) => void;
  customers: Customer[];
}

export default function EmailForm({ onValidate, customers }: EmailFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
  });

  const handleCustomerSelect = (customer: Customer) => {
    setValue('razaoSocial', customer.razaoSocial);
    setValue('nomeFantasia', customer.nomeFantasia);
    setValue('cnpj', customer.cnpj);
    setValue('email', customer.email);
    setValue('phone', customer.phone);
    setShowCustomerSearch(false);
    setSearchQuery('');
  };

  const filteredCustomers = customers.filter(customer =>
    searchQuery && (
      customer.razaoSocial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.cnpj.includes(searchQuery)
    )
  );

  return (
    <form onSubmit={handleSubmit(onValidate)} className="space-y-8">
      <div className="relative">
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowCustomerSearch(true)}
            placeholder="Buscar sacado por nome ou CNPJ..."
            className="flex-1 pl-4 pr-12 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {showCustomerSearch && filteredCustomers.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-700 rounded-lg shadow-lg border border-gray-600">
            <ul className="py-1">
              {filteredCustomers.map((customer) => (
                <li
                  key={customer.id}
                  className="px-4 py-3 hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="text-sm text-white">{customer.razaoSocial}</div>
                  <div className="text-xs text-gray-400">{customer.cnpj}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Razão Social
          </label>
          <input
            type="text"
            {...register('razaoSocial')}
            readOnly
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Nome Fantasia
          </label>
          <input
            type="text"
            {...register('nomeFantasia')}
            readOnly
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            CNPJ
          </label>
          <input
            type="text"
            {...register('cnpj')}
            readOnly
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Telefone
          </label>
          <input
            type="text"
            {...register('phone')}
            readOnly
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            E-mail
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Número da NF
          </label>
          <input
            type="text"
            {...register('numeroNF')}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.numeroNF && (
            <p className="text-sm text-red-500">{errors.numeroNF.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Valor Total
          </label>
          <CurrencyInput
            name="valorTotal"
            register={register}
            error={errors.valorTotal?.message}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
      >
        Visualizar E-mail
      </button>
    </form>
  );
}