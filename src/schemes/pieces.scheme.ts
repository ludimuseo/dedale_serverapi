//pieces.schemes.ts

export interface Address {
  address: string;
  postal: string;
  city: string;
  country: string;
}

export interface Language {
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
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

export interface PieceScheme {
  stepId: string;
  content: {
    image: string[];
  };
  status: {
    isActive: boolean;
    isPublished: boolean;
  };
  address: Address;
  description: Description;
  audio: Audio;
}
