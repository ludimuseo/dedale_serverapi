//steps.schemes.ts

export interface Language {
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
}

export interface Address {
  address: string;
  postal: string;
  city: string;
  country: string;
}

export interface Coords {
  lat: number;
  lon: number;
  locationRequired: boolean;
}

export interface StatusFalc {
  isValidate: boolean;
  isCertified: boolean;
  certifiedDate: Date;
  isCorrected: boolean;
}

export interface Description {
  falc: Language;
  falcCertified: string;
  userId: string;
  statusFalc: StatusFalc;
  standard: Language;
}

export interface Audio {
  falc: Language;
  standard: Language;
}

export interface StepScheme {
  journeyId: string;
  medalId: string;
  content: {
    image: string[];
  };
  name: Language;
  stage: {
    stepNumber: number;
  };
  status: {
    isActive: boolean;
    isPublished: boolean;
  };
  address: Address;
  coords: Coords;
  description: Description;
  audio: Audio;
}
