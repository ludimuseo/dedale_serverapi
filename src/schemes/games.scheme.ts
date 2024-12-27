// games.scheme.ts

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

export interface Reponse{
  standard: Language;
  falc: {
    isValidate: boolean;
    langage: Language;
  };
};

export interface Question{
  standard: Language;
  falc: {
    isValidate: boolean;
    langage: Language;
  };
};


export interface GameScheme {
  pieceID: string;
  type:string;
  level: string;
  image?: string;
  name:Language;
  question:Question;
  audio: Audio;
  reponse: {
    reponse_true:Reponse;
    reponse_1:Reponse;
    reponse_2:Reponse;
  };
  explanation: {
    reponse_true:Reponse;
    reponse_1:Reponse;
    reponse_2:Reponse;
  };
  status: {
    isActive: boolean; 
    isPublished : boolean;
  };
};
 

