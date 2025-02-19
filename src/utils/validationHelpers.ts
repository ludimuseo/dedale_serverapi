// validationHelpers.ts : organisation des règles de validation des données

import { body } from 'express-validator';

/**
 * Génère des règles de validation dynamiquement
 * @param fields Liste des champs et leurs types attendus
 * @returns Tableau de règles de validation
 */
export const generateValidationRules = (fields: Record<string, string>) => {
  return Object.keys(fields).map((field) => {
    switch (fields[field]) {
      case 'string':
        return body(field)
          .optional()
          .isString()
          .withMessage(`${field} doit être une chaîne de caractères`);
      case 'email':
        return body(field)
          .optional()
          .isEmail()
          .withMessage(`${field} doit être un email valide`);
      case 'url':
        return body(field)
          .optional()
          .isURL()
          .withMessage(`${field} doit être une URL valide`);
      case 'required_string':
        return body(field)
          .notEmpty()
          .withMessage(`${field} est requis`)
          .isString()
          .withMessage(`${field} doit être une chaîne de caractères`);
      default:
        return body(field).optional();
    }
  });
};
