//userValidation.ts : validation des données des users routes

import { body } from "express-validator";

// Validation pour la création d'un utilisateur - POST
export const validateUserCreation = [
  body("profile.username").notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body("profile.email").isEmail().withMessage("L'email n'est pas valide"),
  body("profile.password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("profile.role")
    .isIn(["SUPER_ADMIN", "ADMIN", "CONTRIBUTOR", "USER", "CORRECTOR", "REFERENT"])
    .withMessage("Le rôle est invalide"),
];

// Validation pour la mise à jour d'un utilisateur - PATCH
export const validateUserUpdate = [
  body("profile.username").optional().notEmpty().withMessage("Le nom d'utilisateur ne peut pas être vide"),
  body("profile.email").optional().isEmail().withMessage("L'email doit être valide"),
  body("profile.password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

