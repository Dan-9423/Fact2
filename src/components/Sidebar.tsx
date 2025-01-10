import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  FileText,
  Users,
  Mail,
  Calendar,
  BarChart,
  ChevronDown,
  ChevronRight,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { icon: Home, label: 'Início', path: '/' },
  {
    icon: FileText,
    label: 'Relatórios',
    submenu: [
      { label: 'Contas Semanais', path: '/relatorios/contas-semanais' },
      { label: 'Contas Mensais', path: '/relatorios/contas-mensais' },
      { label: 'Fechamento', path: '/relatorios/fechamento' },
    ],
  },
  {
    icon: Mail,
    label: 'E-mails Factory',
    submenu: [
      { label: 'Sacados', path: '/emails/sacados' },
      { label: 'Envio de E-mails', path: '/emails/enviar' },
      { label: 'Template de E-mail', path: '/emails/template' },
    ],
  },
];

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(current =>
      current.includes(label)
        ? current.filter(item => item !== label)
        : [...current, label]
    );
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <BarChart className="h-8 w-8 text-blue-500" />
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <div key={index} className="space-y-2">
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {expandedMenus.includes(item.label) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedMenus.includes(item.label) && (
                  <div className="ml-6 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          cn(
                            'block px-4 py-2 rounded-lg transition-colors',
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          )
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}