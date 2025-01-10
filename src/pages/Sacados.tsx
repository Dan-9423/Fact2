import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CustomerForm from '../components/forms/CustomerForm';
import CustomerList from '../components/customers/CustomerList';
import CustomerSearch from '../components/customers/CustomerSearch';
import Modal from '../components/ui/Modal';
import { Customer, CustomerFormData } from '../types/customer';
import { useCustomers } from '../context/CustomerContext';

export default function Sacados() {
  const { customers, setCustomers } = useCustomers();
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (data: CustomerFormData) => {
    if (editingCustomer) {
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id ? { ...data, id: c.id } : c
      ));
      setEditingCustomer(null);
    } else {
      setCustomers([...customers, { ...data, id: crypto.randomUUID() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleView = (customer: Customer) => {
    setViewingCustomer(customer);
    setShowViewModal(true);
  };

  const handleDelete = (customerId: string) => {
    setCustomers(customers.filter(c => c.id !== customerId));
  };

  const filteredCustomers = customers.filter(customer =>
    customer.razaoSocial.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.cnpj.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Sacados</h1>
        <button
          onClick={() => {
            setEditingCustomer(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Sacado
        </button>
      </div>

      <CustomerSearch onSearch={setSearchQuery} />

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <CustomerList
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingCustomer(null);
        }}
        title={editingCustomer ? 'Editar Sacado' : 'Novo Sacado'}
      >
        <CustomerForm
          onSubmit={handleSubmit}
          initialData={editingCustomer || undefined}
        />
      </Modal>

      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setViewingCustomer(null);
        }}
        title="Detalhes do Sacado"
      >
        {viewingCustomer && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Razão Social</label>
              <p className="text-white">{viewingCustomer.razaoSocial}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Nome Fantasia</label>
              <p className="text-white">{viewingCustomer.nomeFantasia}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">CNPJ</label>
              <p className="text-white">{viewingCustomer.cnpj}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Telefone</label>
              <p className="text-white">{viewingCustomer.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">E-mail</label>
              <p className="text-white">{viewingCustomer.email}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}