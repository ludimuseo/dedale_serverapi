//pieces.schemes.ts

export interface Coords {
    lat: number;
    lon: number;
  };

  export interface Address{
    address: string;
    postal: string;  
    city: string;
    country: string;
  };

  export interface Language{
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };

  export interface Description {
    falc: Language;
    standard: Language;
  };
  
export interface Audio {
  falc: Language;
  standard: Language;
};


export interface PieceScheme {
stepId : string;
image: string;
locationRequired : boolean;
name: Language;
status: {
    isActive: boolean; 
    isPublished : boolean;
  };
address: Address;
coords: Coords;
description: Description;
audio: Audio;
};