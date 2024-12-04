// games.scheme.ts

export interface StandardTranslation {
    fr: string;
    en: string;
    es: string;
    de: string;
    it: string;
  }
  
  export interface FalcTranslation extends StandardTranslation {
    isValidate: boolean; // Indique si le FALC est validé.
  }
  
  export interface Question {
    standard: StandardTranslation;
    falc: FalcTranslation;
  }
  
  export interface Audio {
    standard: StandardTranslation;
    falc: StandardTranslation;
  }
  
  export interface Response {
    responseTrue: {
      standard: StandardTranslation;
      falc: FalcTranslation;
    };
    response1: {
      standard: StandardTranslation;
      falc: FalcTranslation;
    };
    response2: {
      standard: StandardTranslation;
      falc: FalcTranslation;
    };
  }
  
  export interface Explanation {
    responseTrue: {
      standard: StandardTranslation;
      falc: FalcTranslation;
    };
    response1: {
      standard: StandardTranslation;
      falc: FalcTranslation;
    };
    response2: {
      standard: StandardTranslation;
      falc: FalcTranslation;
    };
  }
  
  export interface Status {
    isActive: boolean;
    isPublished: boolean;
  }
  
  export interface Game {
    pieceId: string;
    name: StandardTranslation;
    type: string; // e.g., 'quiz'
    level: string;
    image: string;
    question: Question;
    audio: Audio;
    response: Response;
    explanation: Explanation;
    status: Status;
  }
  