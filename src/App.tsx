import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomerProvider } from './context/CustomerContext';
import { EmailTemplateProvider } from './context/EmailTemplateContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sacados from './pages/Sacados';
import EnviarEmails from './pages/EnviarEmails';
import EmailTemplate from './pages/EmailTemplate';
import ContasSemanais from './pages/ContasSemanais';
import ContasMensais from './pages/ContasMensais';

export default function App() {
  return (
    <CustomerProvider>
      <EmailTemplateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/emails/sacados" element={<Sacados />} />
              <Route path="/emails/enviar" element={<EnviarEmails />} />
              <Route path="/emails/template" element={<EmailTemplate />} />
              <Route path="/relatorios/contas-semanais" element={<ContasSemanais />} />
              <Route path="/relatorios/contas-mensais" element={<ContasMensais />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EmailTemplateProvider>
    </CustomerProvider>
  );
}