// clients.controller.ts = requête HTTP

import { Request, Response } from "express";
import { ClientsService } from "../services/clients.service";
import { validationResult } from "express-validator";

/**
 * Récupérer la liste des clients
 */
export const getAllClients = async (_req: Request, res: Response) => {
  try {
    const clients = await ClientsService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Récupérer un client par son ID
 */
export const getClientById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const client = await ClientsService.getClientById(id);
    if (!client) {
      return res.status(404).json({ message: `Client avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Erreur lors de la récupération du client par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/**
 * Créer un nouveau client
 */
export const createClient = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const clientData = req.body;
    const newClient = await ClientsService.addClient(clientData);
    res.status(201).json({ message: "Client ajouté avec succès", clientId: newClient.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout du client:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du client" });
  }
};

/**
 * Mettre à jour un client existant
 */
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const client = await ClientsService.getClientById(id);
    if (!client) {
      return res.status(404).json({ message: `Client avec l'ID ${id} introuvable.` });
    }

    await ClientsService.updateClient(id, req.body);
    res.status(200).json({ message: `Client ${id} mis à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du client" });
  }
};

/**
 * Supprimer un client
 */
export const deleteClient = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const client = await ClientsService.getClientById(id);
    if (!client) {
      return res.status(404).json({ message: `Client avec l'ID ${id} introuvable.` });
    }

    await ClientsService.deleteClient(id);
    res.status(200).json({ message: `Client ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du client" });
  }
};
