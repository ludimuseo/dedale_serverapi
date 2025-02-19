//users.schemes.ts

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
  USER = 'USER',
  CORRECTOR = 'CORRECTOR',
  REFERENT = 'REFERENT',
}
// ou export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'CONTRIBUTOR' | 'USER' | 'CORRECTOR'| 'REFERENT';

export interface Profile {
  username: string;
  email: string;
  password: string;
  token: string;
  avatar: string;
  clientId: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
  logs: Date[];
}

export interface Language {
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
}

export interface Setting {
  isContrast: boolean;
  isFalc: boolean;
  fontSize: number;
  language: Language;
  isTutorial: boolean;
}

export interface UserScheme {
  placeId: string;
  journeyId: string;
  stepId: string;
  medalId: string;
  profile: Profile;
  setting: Setting;
}
