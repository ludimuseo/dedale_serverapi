//genericRoutes.ts

import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { validateId } from "../middlewares/validation";

/**
 * Génère un routeur générique pour une entité donnée (ex: users, clients)
 * @param {Object} service - Service correspondant (ex: UsersService, ClientsService)
 * @param {Array} validationCreate - Middleware de validation pour POST
 * @param {Array} validationUpdate - Middleware de validation pour PATCH
 * @returns {Router} - Routeur Express configuré
 */
export const generateRoutes = (service: any, validationCreate: any[], validationUpdate: any[]) => {
  const router = Router();

  // GET - Récupérer tous les éléments
  router.get("/list", async (_req, res) => {
    try {
      const items = await service.getAll();
      res.status(200).json(items);
    } catch (error) {
      console.error("Erreur lors de la récupération des éléments:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

  // GET - Récupérer un élément par ID
  router.get("/find/:id", validateId, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const item = await service.getById(id);
      if (!item) {
        return res.status(404).json({ message: `Élément avec l'ID ${id} introuvable.` });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'élément par ID:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

  // POST - Créer un nouvel élément
  router.post("/create", validationCreate, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newItem = await service.create(req.body);
      res.status(201).json({ message: "Élément ajouté avec succès", id: newItem.id });
    } catch (error) {
      console.error("Erreur lors de la création de l'élément:", error);
      res.status(500).json({ message: "Erreur interne lors de la création de l'élément" });
    }
  });

  // PATCH - Mettre à jour un élément existant
  router.patch("/update/:id", validateId, validationUpdate, async (req: Request, res: Response) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const item = await service.getById(id);
      if (!item) {
        return res.status(404).json({ message: `Élément avec l'ID ${id} introuvable.` });
      }

      await service.update(id, req.body);
      res.status(200).json({ message: `Élément ${id} mis à jour avec succès.` });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'élément:", error);
      res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'élément" });
    }
  });

  // DELETE - Supprimer un élément
  router.delete("/delete/:id", validateId, async (req: Request, res: Response) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const item = await service.getById(id);
      if (!item) {
        return res.status(404).json({ message: `Élément avec l'ID ${id} introuvable.` });
      }

      await service.delete(id);
      res.status(200).json({ message: `Élément ${id} supprimé avec succès.` });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'élément:", error);
      res.status(500).json({ message: "Erreur interne lors de la suppression de l'élément" });
    }
  });

  return router;
};
