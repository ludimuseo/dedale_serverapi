//validation.ts : validation des données des routes

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
  'profile.email': 'email',
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
  'contact.phone': 'string',
  'contact.note': 'string',
};

// Validation dynamique des clients
export const validateClientCreation = generateValidationRules(clientFields);
export const validateClientUpdate = generateValidationRules(clientUpdateFields);
