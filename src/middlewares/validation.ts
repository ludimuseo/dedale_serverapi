//validation.ts : validation des données des routes

import { body,param } from "express-validator";

//-------------------------GENERAL-------------------------------------------
// Validation de l'ID utilisateur pour DELETE, GET et PATCH
export const validateId = [
  param("id").isString().withMessage("L'ID de l'utilisateur doit être une chaîne de caractères valide"),
];



//-------------------------USERS-------------------------------------------

// Validation pour la création d'un utilisateur - POST
export const validateUserCreation = [
  body("profile.username").notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body("profile.email").isEmail().withMessage("L'email n'est pas valide"),
  body("profile.password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("profile.avatar").notEmpty().withMessage("L'avatar est requis"),
  body("profile.clientId").notEmpty().withMessage("Le client ID est requis"),
];

// Validation pour la mise à jour d'un utilisateur - PATCH
export const validateUserUpdate = [
  body("profile.username").optional().notEmpty().withMessage("Le nom d'utilisateur ne peut pas être vide"),
  body("profile.email").optional().isEmail().withMessage("L'email doit être valide"),
  body("profile.password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("profile.avatar").optional().notEmpty().withMessage("L'avatar ne peut pas être vide"),
  body("profile.clientId").optional().notEmpty().withMessage("Le client ID ne peut pas être vide"),
];

//-------------------------CLIENTS-------------------------------------------

// Validation pour la création d'un client - POST
export const validateClientCreation = [
  body("company.name").notEmpty().withMessage("Le nom de l'entreprise est requis"),
  body("company.siret").notEmpty().isString().withMessage("Le SIRET doit être une chaîne de caractères"),
  body("company.tva").notEmpty().isString().withMessage("Le numéro TVA doit être une chaîne de caractères"),
  body("company.website").optional().isURL().withMessage("Le site web doit être une URL valide"),

  body("address.address").notEmpty().withMessage("L'adresse est requise"),
  body("address.postal").notEmpty().withMessage("Le code postal est requis"),
  body("address.city").notEmpty().withMessage("La ville est requise"),
  body("address.country").notEmpty().withMessage("Le pays est requis"),

  body("contact.name").notEmpty().withMessage("Le nom du contact est requis"),
  body("contact.email").isEmail().withMessage("L'email doit être valide"),
  body("contact.phone").isString().withMessage("Le numéro de téléphone doit être une chaîne de caractères"),
];

// Validation pour la mise à jour d'un client - PATCH
export const validateClientUpdate = [
  body("company.name").optional().notEmpty().withMessage("Le nom de l'entreprise ne peut pas être vide"),
  body("company.siret").optional().isString().withMessage("Le SIRET doit être une chaîne de caractères"),
  body("company.tva").optional().isString().withMessage("Le numéro TVA doit être une chaîne de caractères"),
  body("company.website").optional().isURL().withMessage("Le site web doit être une URL valide"),

  body("address.address").optional().notEmpty().withMessage("L'adresse ne peut pas être vide"),
  body("address.postal").optional().notEmpty().withMessage("Le code postal ne peut pas être vide"),
  body("address.city").optional().notEmpty().withMessage("La ville ne peut pas être vide"),
  body("address.country").optional().notEmpty().withMessage("Le pays ne peut pas être vide"),

  body("contact.name").optional().notEmpty().withMessage("Le nom du contact ne peut pas être vide"),
  body("contact.email").optional().isEmail().withMessage("L'email doit être valide"),
  body("contact.phone").optional().isString().withMessage("Le numéro de téléphone doit être une chaîne de caractères"),
  body("contact.note").optional().isString().withMessage("La note doit être une chaîne de caractères"),
];






