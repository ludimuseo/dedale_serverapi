//clients.schmes.ts

export interface ClientScheme {
  id?: string; 
  company: {
    name: string;
    siret: string;
    tva: string;
    website?: string;  // Si "website" est optionnel, on le rend facultatif
  };
  address: {
    address: string;
    postal: string;  // Changer en string pour les codes postaux, si nécessaire
    city: string;
    country: string;
  };
  contact: {
    name: string;
    email: string;
    tel: string;  // Changer en string pour gérer les numéros de téléphone
    note?: string;  // Rendre "note" optionnel si nécessaire
  };
  status: {
    isActive: boolean;  // Représente si le client est actif ou non
  };
}
