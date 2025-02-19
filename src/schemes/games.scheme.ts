// games.scheme.ts

export interface Content {
  image?: string[];
  type: string;
  level: string;
}

export interface Language {
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
}

export interface Audio {
  standard: Language;
  falc: Language;
}

export interface Response {
  standard: Language;
  falcResp: {
    falcCertified: string;
    langage: Language;
  };
}

export interface StatusFalc {
  isValidate: boolean;
  isCertified: boolean;
  certifiedDate: Date;
  isCorrected: boolean;
}

export interface Question {
  standard: Language;
  falcQuest: {
    language: Language;
    falcCertified: string;
    userId: string;
  };
  statusFalc: StatusFalc;
}

export interface GameScheme {
  pieceId: string;
  content: Content;
  name: Language;
  question: Question;
  audio: Audio;
  reponse: {
    reponse_true: Response;
    reponse_1: Response;
    reponse_2: Response;
  };
  explanation: {
    reponse_true: Response;
    reponse_1: Response;
    reponse_2: Response;
  };
  status: {
    isActive: boolean;
    isPublished: boolean;
  };
}
