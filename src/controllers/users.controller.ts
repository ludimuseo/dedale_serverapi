// users.controller.ts

import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { validationResult } from "express-validator";

/**
 * Récupérer la liste des utilisateurs
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer un utilisateur par son ID
 */
export const getUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Créer un nouvel utilisateur
 */
export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userData = req.body;
    const newUser = await UsersService.addUser(userData);
    res.status(201).json({ message: "Utilisateur ajouté avec succès", userId: newUser.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de l'utilisateur" });
  }
};

/**
 * Mettre à jour un utilisateur existant
 */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }

    await UsersService.updateUser(id, req.body);
    res.status(200).json({ message: `Utilisateur ${id} mis à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'utilisateur" });
  }
};

/**
 * Supprimer un utilisateur
 */
export const deleteUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }

    await UsersService.deleteUser(id);
    res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de l'utilisateur" });
  }
};
