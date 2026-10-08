export type ViewMode = 'landing' | 'docs' | 'dashboard';

export interface TokenScope {
  id: string;
  name: string;
  description: string;
  category: 'Instances' | 'Messages' | 'Webhooks' | 'Account';
}

export interface PersonalAccessToken {
  id: string;
  label: string;
  tokenPreview: string; // e.g. "vvn_live_948f...b21"
  scopes: string[];
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

export interface DocSection {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
  }[];
}
