// client.scheme.ts

export interface ClientScheme {
  company: {
    name: string;
    siret: string;
    tva: string;
    website: string;
  };
  address: {
    address: string;
    postal: number;
    city: string;
    country: string;
  };
  contact: {
    name: string;
    email: string;
    tel: number;
    note: string;
  };
  status: {
    isActive: boolean; ///superAdmin => suppression/désactivation du client.
  };
}
