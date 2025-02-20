// validation.ts : Validation des données des routes

import { param } from 'express-validator';
import { generateValidationRules } from '../utils/validationHelpers';

//-------------------------GENERAL-------------------------------------------
// Validation de l'ID utilisateur pour DELETE, GET et PATCH
export const validateId = [
  param('id')
    .isString()
    .withMessage("L'ID doit être une chaîne de caractères valide"),
];

//-------------------------USERS-------------------------------------------

// Champs pour la création d'un utilisateur
const userFields = {
  'profile.username': 'required_string',
  'profile.email': 'required_email', // Correction ici
  'profile.password': 'required_string',
  'profile.avatar': 'required_string',
  'profile.clientId': 'required_string',
};

// Champs pour la mise à jour d'un utilisateur
const userUpdateFields = {
  'profile.username': 'string',
  'profile.email': 'email',
  'profile.password': 'string',
  'profile.avatar': 'string',
  'profile.clientId': 'string',
};

// Validation dynamique des utilisateurs
export const validateUserCreation = generateValidationRules(userFields);
export const validateUserUpdate = generateValidationRules(userUpdateFields);

//-------------------------CLIENTS-------------------------------------------

// Champs pour la création d'un client
const clientFields = {
  'company.name': 'string',
  'company.siret': 'string',
  'company.tva': 'string',
  'company.website': 'url',
  'company.type': 'string',

  'address.address': 'required_string',
  'address.postal': 'required_string',
  'address.city': 'required_string',
  'address.country': 'required_string',

  'contact.name': 'required_string',
  'contact.note': 'string',
  'contact.email': 'required_email',
  'contact.tel': 'string',
};

// Champs pour la mise à jour d'un client
const clientUpdateFields = {
  'company.name': 'string',
  'company.siret': 'string',
  'company.tva': 'string',
  'company.website': 'url',

  'address.address': 'string',
  'address.postal': 'string',
  'address.city': 'string',
  'address.country': 'string',

  'contact.name': 'string',
  'contact.email': 'email',
  'contact.tel': 'string',
  'contact.note': 'string',
};

// Champs pour la création d'un lieu
const lieuFields = {
  'medalId': 'integer',
  'address.address': 'string',
  'address.city': 'string',
  'address.country': 'string',
  'address.postal': 'string',

  'audio.falc.en': 'string',
  'audio.falc.fr': 'string',
  'audio.standard.en': 'string',
  'audio.standard.fr': 'string',

  'content.image': 'string',
  'content.type': 'string',

  'coords.isLocationRequired': 'boolean',
  'coords.lat': 'float',
  'coords.lon': 'float',

  'description': 'array',
  'description.*.falc.en': 'string',
  'description.*.falc.fr': 'string',
  'description.*.falc.falcCertified': 'boolean',
  'description.*.falc.userId': 'string',

  'description.*.falc.status.isValidate': 'boolean',
  'description.*.falc.status.isCertified': 'boolean',
  'description.*.falc.status.certifiedDate': 'string',
  'description.*.falc.status.isCorrected': 'boolean',

  'description.*.standard.en': 'string',
  'description.*.standard.fr': 'string',

  'name.en': 'string',
  'name.fr': 'string',

  'status.isActive': 'boolean',
  'status.isPublished': 'boolean',
};

// Validation dynamique des clients et lieux
export const validateClientCreation = generateValidationRules(clientFields);
export const validateClientUpdate = generateValidationRules(clientUpdateFields);
export const validateLieuCreation = generateValidationRules(lieuFields);
