//journeys.schemes.ts

export interface Content {
  image?: string[];
  duration?: number;
  type:string;
};

  export interface Address {
    address: string;
    postal: string;  
    city: string;
    country: string;
  };

  export interface Language { 
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };

  export interface Coords {
    lat: number;
    lon: number;
    locationRequired: boolean;
  };

  export interface Audio {
    falc: Language;
    standard: Language;
  };

  export interface StatusFalc {
    isValidate: boolean;
    isCertified: boolean;
    certifiedDate: Date;
    isCorrected: boolean;
    };
  
  export interface Description {
    falc: Language;
    falcCertified: string;
    userID: string;
    statusFalc: StatusFalc ;
    standard: Language;
  };

export interface JourneyScheme {
placeId?:string ;
medalId?: string;
content: Content; 
name: Language;
address: Address;
coords: Coords ;
audio: Audio;
description: Description;
};
  