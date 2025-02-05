//clients.routes.ts

import { Router } from "express";
import { validateClientCreation, validateClientUpdate, validateId } from "../middlewares/validation";
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from "../controllers/clients.controller";

const router = Router();

router.get("/list", getAllClients);
router.get("/find/:id", validateId, getClientById);
router.post("/create", validateClientCreation, createClient);
router.patch("/update/:id", validateId, validateClientUpdate, updateClient);
router.delete("/delete/:id", validateId, deleteClient);

export default router;
