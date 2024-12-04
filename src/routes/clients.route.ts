//clients.routes.ts

import { Router } from "express";
import { ClientsService } from "../services/clients.service";

const router = Router();

//GET
router.get("/list", async (_req, res) => {
  const clients = await ClientsService.getAllClients();
  res.json(clients);
});


// GET client by ID
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


//POST
router.post("/create", async (req, res) => {
  await ClientsService.addClient(req.body);
  res.status(201).send("Client added");
});

//PUT 
router.put("/update/:id", async (req, res) => {
  await ClientsService.updateClient(req.params.id, req.body);
  res.status(200).send("Client updated");
});

//DEL
router.delete("/delete/:id", async (req, res) => {
  await ClientsService.deleteClient(req.params.id);
  res.status(200).send("Client deleted");
});

export default router;
