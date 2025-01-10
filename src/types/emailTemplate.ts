export interface EmailTemplateVersion {
  id: string;
  version: string;
  template: {
    subject: string;
    content: string;
  };
  createdAt: Date;
  description: string;
}

export interface EmailTemplateState {
  template: {
    subject: string;
    content: string;
  };
  currentVersion: string;
  versions: EmailTemplateVersion[];
}