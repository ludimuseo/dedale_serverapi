//medals.schemes.ts

export interface Language{
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };

export type AssignedType = 'placeId' | 'journeyId' | 'stepId';

export interface StatusFalc {
  isValidate: boolean;
  isCertified: boolean;
  certifiedDate: Date;
  isCorrected: boolean;
  };

export interface Description {
  standard: Language;
  falc: Language;
  falcCertified: string;
  userId: string;
  statusFalc: StatusFalc ;
  };
  
export interface Audio {
  falc: Language;
  standard: Language;
};

export interface MedalScheme {
content: {
  image?: string[];
};
name: Language;
status: AssignedType;
description: Description;
audio: Audio;
};