import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Customer } from '../../types/customer';
import { formatCNPJ } from '../../lib/utils';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onView: (customer: Customer) => void;
}

export default function CustomerList({ customers, onEdit, onDelete, onView }: CustomerListProps) {
  return (
    <div>
      <table className="w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Empresa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              CNPJ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              E-mail
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-200">{customer.razaoSocial}</span>
                  <span className="text-xs text-gray-400">{customer.nomeFantasia}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {formatCNPJ(customer.cnpj)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {customer.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(customer)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(customer.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}