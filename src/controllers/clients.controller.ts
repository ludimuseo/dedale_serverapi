// clients.controller.ts = requête HTTP

import type { Request, Response, NextFunction } from 'express';
import { ClientsService } from '../services/clients.service';
import { ClientService } from '../services/client.service';
import { validationResult } from 'express-validator';
import type { AuthenticatedRequest } from '../utils/types';

/**
 * Récupérer la liste des clients
 */
export const getAllClients = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await ClientsService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer un client par son ID
 */
export const getClientById = async (
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
    const client = await ClientsService.getClientById(id);
    if (!client) {
      return res
        .status(404)
        .json({ message: `Client avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

/**
 * Créer un nouveau client
 */
export const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const authReq = req as AuthenticatedRequest;
    const newClient = await ClientService.addClient(authReq);

    if ('error' in newClient) {
      return res.status(400).json({ error: newClient.error });
    }

    res.status(newClient.httpCode).json({
      message: 'Le client a été créé avec succès.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour un client existant
 */
export const updateClient = async (
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
    const client = await ClientsService.getClientById(id);
    if (!client) {
      return res
        .status(404)
        .json({ message: `Client avec l'ID ${id} introuvable.` });
    }

    await ClientsService.updateClient(id, req.body);
    res.status(200).json({ message: `Client ${id} mis à jour avec succès.` });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un client
 */
export const deleteClient = async (
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
    const client = await ClientsService.getClientById(id);
    if (!client) {
      return res
        .status(404)
        .json({ message: `Client avec l'ID ${id} introuvable.` });
    }

    await ClientsService.deleteClient(id);
    res.status(200).json({ message: `Client ${id} supprimé avec succès.` });
  } catch (error) {
    next(error);
  }
};
