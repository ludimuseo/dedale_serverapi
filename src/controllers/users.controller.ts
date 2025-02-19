// users.controller.ts

import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/users.service';
import { UsersLoginService } from '../services/users_login.service';
import { validationResult } from 'express-validator';
import { log } from 'node:console';
import { AuthenticatedRequest } from '../utils/types';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = req as AuthenticatedRequest;
  try {
    const user = await UsersLoginService.connectUser(authReq);

    // If user disable return isActiveFalse
    if (user == 'isActiveFalse') {
      return res.status(401).json({ message: 'isActiveFalse' });
    }

    // return user info or error if no user ou password wrong
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'error' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer la liste des utilisateurs
 */
export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer un utilisateur par son ID
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Créer un nouvel utilisateur
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userData = req.body;
    const newUser = await UsersService.addUser(userData);
    res
      .status(201)
      .json({ message: 'Utilisateur ajouté avec succès', userId: newUser.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour un utilisateur existant
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }

    await UsersService.updateUser(id, req.body);
    res
      .status(200)
      .json({ message: `Utilisateur ${id} mis à jour avec succès.` });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un utilisateur
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }

    await UsersService.deleteUser(id);
    res
      .status(200)
      .json({ message: `Utilisateur ${id} supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};
