//clients.routes.ts

import { Router, Request, Response } from "express";
import { ClientsService } from "../services/clients.service";
import { ClientScheme } from "../schemes/clients.scheme";
import { validateClientCreation, validateClientUpdate, validateId } from "../middlewares/validation";
import { validationResult } from "express-validator";

const router = Router();

// GET - Récupérer la liste des clients
router.get("/list", async (_req, res) => {
  try {
    const clients = await ClientsService.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// GET - Récupérer un client par son ID
router.get("/find/:id", validateId, async (req: Request, res: Response) => {
  // Vérifier la validation
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
});

// POST - Créer un nouveau client
router.post("/create", validateClientCreation, async (req: Request, res: Response) => {
  // Vérifier la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const clientData: ClientScheme = req.body;
    const newClient = await ClientsService.addClient(clientData);
    res.status(201).json({ message: "Client ajouté avec succès", clientId: newClient.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout du client:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du client" });
  }
});

// PATCH - Mettre à jour un client existant
router.patch("/update/:id", validateId, async (req: Request, res: Response) => {
  // Vérifier si le client existe avant la validation des champs
  const { id } = req.params;
  const client = await ClientsService.getClientById(id);
  if (!client) {
    return res.status(404).json({ message: `Client avec l'ID ${id} introuvable.` });
  }

  // Appliquer la validation des champs après avoir validé l'ID
  await Promise.all(validateClientUpdate.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updateData = req.body;
    await ClientsService.updateClient(id, updateData);
    res.status(200).json({ message: `Client ${id} mis à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du client" });
  }
});

// DELETE - Supprimer un client
router.delete("/delete/:id", validateId, async (req: Request, res: Response) => {
  // Vérifier la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;

    // Vérifier si le client existe avant suppression
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
});

export default router;
