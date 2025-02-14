// places.scheme.ts

export type PlaceType =
  | "museum"
  | "monument"
  | "town-village"
  | "outdoor"
  | "castle";

export interface Address {
  address: string;
  postal: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export interface StandardDescription {
  fr: string;
  en: string;
  es: string;
  de: string;
  it: string;
}

export interface FalcDescription extends StandardDescription {
  isValidate: boolean; // FALC validé ou non
}

export interface Description {
  standard: StandardDescription;
  falc: FalcDescription;
}

export interface Audio {
  standard: StandardDescription;
  falc: StandardDescription;
}

export interface PlaceStatus {
  isActive: boolean;
  isPublished: boolean;
}

export interface Place {
  clientId: string;
  name: StandardDescription;
  medal: string;
  type: PlaceType;
  image: string;
  locationRequired: boolean;
  address: Address;
  description: Description;
  audio: Audio;
  status: PlaceStatus;
}
