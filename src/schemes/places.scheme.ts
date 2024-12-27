//places.scheme.ts

export interface Content {
  image?: string;
  type:string;

};

export interface Address {
    address: string;
    city: string;
    postal: string;  
    country: string;
};

export interface Language{
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
};

export interface Audio {
  standard: Language;
  falc: Language;
};

export interface Coords {
  lat: number;
  lon: number;
  isLocationRequired: boolean;
};

export interface Description {
  standard: Language;
  falc: Language;
};

export interface PlaceScheme { 
  clientID: string;
  medals: string;
  content: Content;
  name:Language;
  status: {
    isActive: boolean; 
    isPublished : boolean;
  };
  address: Address;
  coords: Coords;
  description: Description;
  audio: Audio;
  };


  





