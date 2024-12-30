//clients.routes.ts

import { Router } from "express";
import { ClientsService } from "../services/clients.service";
import { ClientScheme } from "../schemes/clients.scheme";

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
router.get("/find/:id", async (req, res) => {
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
router.post("/create", async (req, res) => {
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
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;  
    await ClientsService.updateClient(id, updateData);
    res.status(200).json({ message: `Client ${id} mis à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du client" });  
  }
});

// DELETE - Supprimer un client
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ClientsService.deleteClient(id);
    res.status(200).json({ message: `Client ${id} supprimé avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du client" });  
  }
});

export default router;
