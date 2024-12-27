// games.scheme.ts

export interface Language{
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
};

export interface Audio {
  falc: Language;
  standard: Language;
};

export interface Reponse{
  falc: Language;
  standard: Language;
};

export interface GameScheme {
  audio: Audio;
  explanation: {
    reponse_1:Reponse;
    reponse_2:Reponse;
    reponse_true:Reponse;
  };
  image?: string;
  level: string;
  name:Language;
  pieceID: string;
  question:Reponse;
  reponse: {
    reponse_true:Reponse;
    reponse_1:Reponse;
    reponse_2:Reponse;
  };
  status: {
    isActive: boolean; 
    isPublished : boolean;
  };
  type:string;
}
 

