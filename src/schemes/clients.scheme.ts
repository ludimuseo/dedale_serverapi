//clients.schemes.ts

export interface Company{
  name: string;
  siret: string;
  tva: string;
  website?: string; 
};

export interface Address{
  address: string;
  postal: string;  
  city: string;
  country: string;
};

export interface Contact{
  name: string;
  email: string;
  phone: number;  
  note?: string;
};


export interface ClientScheme {
  company: Company ;
  address: Address;
  contact: Contact ;
  status: {
    isActive: boolean; 
  };
};
