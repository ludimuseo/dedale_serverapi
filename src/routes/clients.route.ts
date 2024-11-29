//clients.routes.ts

import { Router } from "express";
import { ClientsService } from "../services/clients.service";

const router = Router();

//GET
router.get("/list", async (_req, res) => {
  const clients = await ClientsService.getAllClients();
  res.json(clients);
});

//POST
router.post("/create", async (req, res) => {
  await ClientsService.addClient(req.body);
  res.status(201).send("Client added");
});

//PUT voir PATCH ?
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
