export interface Customer {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  phone: string;
}

export interface CustomerFormData {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  phone: string;
}