import React from 'react';
import { Search } from 'lucide-react';

interface CustomerSearchProps {
  onSearch: (query: string) => void;
}

export default function CustomerSearch({ onSearch }: CustomerSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Buscar sacados..."
        onChange={(e) => onSearch(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}