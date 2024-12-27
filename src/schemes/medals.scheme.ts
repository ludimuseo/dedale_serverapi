//medals.schemes.ts

export interface Language{
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };

export type AssignedType = 'placeId' | 'journeyId' | 'stepId';

export interface Coords {
    lat: number;
    lon: number;
  };

export interface Description {
    falc: Language;
    standard: Language;
  };
  
export interface Audio {
  falc: Language;
  standard: Language;
};


export interface MedalScheme {
image: string;
name: Language;
status: AssignedType;
coords: Coords;
description: Description;
audio: Audio;
};