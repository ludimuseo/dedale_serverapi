//clients.schemes.ts

export enum ClientType {
  ASSOCIATION = 'ASSOCIATION',
  PROFESSIONAL = 'PROFESSIONAL',
  PARTICULAR = 'PARTICULAR',
}
// ou export type ClientType = 'ASSOCIATION' | 'PROFESSIONAL' | 'PARTICULAR';

export interface Company {
  name: string;
  siret: string;
  tva: string;
  type: ClientType;
  website?: string;
}

export interface Address {
  address: string;
  postal: string;
  city: string;
  country: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: number;
  note?: string;
}

export interface ClientScheme {
  company: Company;
  address: Address;
  contact: Contact;
  status: {
    isActive: boolean;
  };
}
