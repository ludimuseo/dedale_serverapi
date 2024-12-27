//places.scheme.ts

export interface Address {
    address: string;
    country: string;
    postal: string;  
    town: string;
};

export interface Language{
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
};

export interface Audio {
  falc: Language;
  standard: Language;
};

export interface Coords {
  lat: number;
  lon: number;
};

export interface Description {
  falc: Language;
  standard: Language;
};

export interface PlaceScheme { 
  address: Address;
  audio: Audio;
  available: boolean;
  clientID: string;
  coords: Coords;
  description: Description;
  image?: string;
  // (type à préciser)
  medals: any[]; 
  name:Language;
  type:string;
  };


  





