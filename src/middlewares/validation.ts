// validation.ts : Validation des données des routes

import { param } from 'express-validator';
import { check } from 'express-validator';
// import { generateValidationRules } from '../utils/validationHelpers';

type FieldValidation =
  | 'string'
  | 'email'
  | 'boolean'
  | 'url'
  | 'integer'
  | 'float'
  | 'array'
  | {
      type:
        | 'string'
        | 'email'
        | 'boolean'
        | 'url'
        | 'integer'
        | 'float'
        | 'array';
      required?: boolean;
      notEmpty?: boolean;
    };

//-------------------------GENERAL-------------------------------------------
// Validation de l'ID utilisateur pour DELETE, GET et PATCH
export const validateId = [
  param('id')
    .isString()
    .withMessage("L'ID doit être une chaîne de caractères valide"),
];

//-------------------------USERS-------------------------------------------

// Champs pour la connexion d'un utilisateur
const userLoginFields: Record<string, FieldValidation> = {
  'body.email': { type: 'email', required: true, notEmpty: true },
  'body.password': { type: 'string', required: true, notEmpty: true },
};

const userFields: Record<string, FieldValidation> = {
  'profile.username': { type: 'string', required: true, notEmpty: true },
  'profile.email': { type: 'email', required: true, notEmpty: true },
  'profile.password': { type: 'string', required: true, notEmpty: true },
  'profile.avatar': { type: 'string', required: true, notEmpty: true },
  'profile.clientId': { type: 'string', required: true, notEmpty: true },
};

// Champs pour la mise à jour d'un utilisateur
const userUpdateFields: Record<string, FieldValidation> = {
  'profile.username': 'string',
  'profile.email': 'email',
  'profile.password': 'string',
  'profile.avatar': 'string',
  'profile.clientId': 'string',
};

const generateValidationRules = (fields: Record<string, FieldValidation>) => {
  return Object.entries(fields).map(([field, rules]) => {
    let validator = check(field);

    if (typeof rules === 'string') {
      switch (rules) {
        case 'string':
          validator = validator
            .isString()
            .withMessage(`${field} doit être une chaîne`);
          break;
        case 'email':
          validator = validator
            .isEmail()
            .withMessage(`${field} doit être un email valide`);
          break;
        case 'boolean':
          validator = validator
            .isBoolean()
            .withMessage(`${field} doit être un booléen (true/false)`);
          break;
        case 'url':
          validator = validator
            .isURL()
            .withMessage(`${field} doit être une URL valide`);
          break;
      }
    } else {
      if (rules.required) {
        validator = validator
          .exists({ checkFalsy: true })
          .withMessage(`${field} est requis`);
      }
      if (rules.notEmpty) {
        validator = validator
          .notEmpty()
          .withMessage(`${field} ne peut pas être vide`);
      }
      if (rules.type === 'string') {
        validator = validator
          .isString()
          .withMessage(`${field} doit être une chaîne`);
      }
      if (rules.type === 'email') {
        validator = validator
          .isEmail()
          .withMessage(`${field} doit être un email valide`);
      }
      if (rules.type === 'boolean') {
        validator = validator
          .isBoolean()
          .withMessage(`${field} doit être un booléen (true/false)`);
      }
      if (rules.type === 'url') {
        validator = validator
          .isURL()
          .withMessage(`${field} doit être une URL valide`);
      }
    }

    return validator;
  });
};

// Validation dynamique des utilisateurs
export const validateUserCreation = generateValidationRules(userFields);
export const validateUserUpdate = generateValidationRules(userUpdateFields);
export const validateUserLogin = generateValidationRules(userLoginFields);

//-------------------------CLIENTS-------------------------------------------

// Champs pour la création d'un client
const clientFields: Record<string, FieldValidation> = {
  'company.name': { type: 'string', required: true, notEmpty: true },
  'company.siret': 'string',
  'company.tva': 'string',
  'company.website': 'url',
  'company.type': { type: 'string', required: true, notEmpty: true },

  'address.address': { type: 'string', required: true, notEmpty: true },
  'address.postal': { type: 'string', required: true, notEmpty: true },
  'address.city': { type: 'string', required: true, notEmpty: true },
  'address.country': { type: 'string', required: true, notEmpty: true },

  'contact.name': { type: 'string', required: true, notEmpty: true },
  'contact.note': 'string',
  'contact.email': { type: 'email', required: true, notEmpty: true },
  'contact.tel': 'string',
};

// Champs pour la mise à jour d'un client
const clientUpdateFields: Record<string, FieldValidation> = {
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
const lieuFields: Record<string, FieldValidation> = {
  'place.name': { type: 'string', required: true, notEmpty: true },
  'place.type': { type: 'string', required: true, notEmpty: true },
  'place.lat': 'float',
  'place.lon': 'float',
  'place.location_required': { type: 'boolean', required: true },
  'place.image': 'string',
  'place.isPublished': { type: 'boolean', required: true },
  'place.isActive': { type: 'boolean', required: true },

  'description': 'array',
  'description.*.desc_language': 'string',
  'description.*.desc_order': 'integer',
  'description.*.text': 'string',
  'description.*.image_file': 'string',

  'description.*.image_alt': 'string',
  'description.*.audio_file': 'string',
  'description.*.audio_desc': 'string',
};

// Validation dynamique des clients et lieux
export const validateClientCreation = generateValidationRules(clientFields);
export const validateClientUpdate = generateValidationRules(clientUpdateFields);
export const validateLieuCreation = generateValidationRules(lieuFields);
