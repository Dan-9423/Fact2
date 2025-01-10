import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { EmailData } from '../../types/email';

interface CurrencyInputProps {
  name: 'valorTotal';
  register: UseFormRegister<EmailData>;
  error?: string;
}

export default function CurrencyInput({ name, register, error }: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  const formatCurrency = (value: string) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrency(value);
    setDisplayValue(formattedValue);
    
    // Convert to number for form data
    const numberValue = Number(value) / 100;
    
    // Create a new event with the numeric value
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: numberValue
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(newEvent);
  };

  const { onChange, ...rest } = register(name, {
    setValueAs: (value: string) => {
      if (typeof value === 'number') return value;
      const numericValue = value.replace(/\D/g, '');
      return Number(numericValue) / 100;
    }
  });

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <span className="text-gray-400">R$</span>
      </div>
      <input
        type="text"
        inputMode="numeric"
        {...rest}
        onChange={handleChange}
        value={displayValue}
        onFocus={() => !displayValue && setDisplayValue('0,00')}
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0,00"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}