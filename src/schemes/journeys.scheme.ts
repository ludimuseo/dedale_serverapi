//journeys.schemes.ts

export interface Language{
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };

  export interface Address{
    address: string;
    postal: string;  
    city: string;
    country: string;
  };

  export interface Coords {
    lat: number;
    lon: number;
  };

  export interface Audio {
    falc: Language;
    standard: Language;
  };

  export interface Description {
    falc: Language;
    standard: Language;
  };

export interface JourneyScheme {
PlaceId:string ;
medal: string;
image: string;
duration: number;
locationRequired : boolean;
name: Language;
address: Address;
coords: Coords ;
audio: Audio;
description: Description;
};
  