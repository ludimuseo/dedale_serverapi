// games.scheme.ts

export interface GameScheme {
  image: string;
  level: string;
  name: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };
  pieceID: string;
  question: {
    audio?: string; // Optionnel
    falc: {
      de: string;
      en: string;
      es: string;
      fr: string;
      it: string;
    };
    standard: {
      de: string;
      en: string;
      es: string;
      fr: string;
      it: string;
    };
  };
  response: {
    explanation: {
      falc: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
      standard: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
    };
    responseTrue: {
      falc: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
      standard: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
    };
    response_1: {
      falc: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
      standard: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
    };
    response_2: {
      falc: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
      standard: {
        de: string;
        en: string;
        es: string;
        fr: string;
        it: string;
      };
    };
  };
  type: string; // Exemple : "quizz"
}
