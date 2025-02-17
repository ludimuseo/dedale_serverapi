// validationHelpers.ts : organisation des règles de validation des données

import { body } from "express-validator";

/**
 * Génère des règles de validation dynamiquement
 * @param fields Liste des champs et leurs types attendus
 * @returns Tableau de règles de validation
 */
export const generateValidationRules = (fields: Record<string, string>) => {
  return Object.keys(fields).map((key) => {
      const type = fields[key];

      switch (type) {
          case "required_string":
              return body(key).isString().notEmpty().withMessage(`${key} est requis`);
          case "string":
              return body(key).optional().isString().withMessage(`${key} doit être une chaîne`);
          case "boolean":
              return body(key).isBoolean().withMessage(`${key} doit être un booléen`);
          case "required_email":
              return body(key).isEmail().withMessage(`${key} doit être une adresse email valide`);
          case "email":
              return body(key).optional().isEmail().withMessage(`${key} doit être un email valide`);
          case "url":
              return body(key).isURL().withMessage(`${key} doit être une URL valide`);
          case "int":
              return body(key).isInt().withMessage(`${key} doit être un entier`);
          case "float":
              return body(key).isFloat().withMessage(`${key} doit être un nombre décimal`);
          default:
              return body(key).optional();
      }
  });
};
