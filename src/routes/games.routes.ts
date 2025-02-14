// games.routes.ts

import { Router } from "express";
import { GamesService } from "../services/games.service";

const router = Router();

// GET: Liste de tous les jeux
router.get("/list", async (_req, res) => {
  try {
    const games = await GamesService.getAllGames();
    res.json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: (error as Error).message || "Erreur serveur" });
  }
});

// GET: Jeu par ID
router.get("/find/:id", async (req, res) => {
  try {
    const game = await GamesService.getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: "Jeu introuvable" });
    }
    res.json(game);
  } catch (error) {
    res
      .status(500)
      .json({ error: (error as Error).message || "Erreur serveur" });
  }
});

// POST: Ajouter un nouveau jeu
router.post("/create", async (req, res) => {
  try {
    await GamesService.addGame(req.body);
    res.status(201).send("Jeu ajouté");
  } catch (error) {
    res
      .status(500)
      .json({ error: (error as Error).message || "Erreur serveur" });
  }
});

// PATCH: Mettre à jour un jeu partiellement
router.patch("/update/:id", async (req, res) => {
  try {
    await GamesService.updateGame(req.params.id, req.body);
    res.status(200).send("Jeu mis à jour");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res
      .status(500)
      .json({ error: (error as Error).message || "Erreur serveur" });
  }
});

// DELETE: Supprimer un jeu
router.delete("/delete/:id", async (req, res) => {
  try {
    await GamesService.deleteGame(req.params.id);
    res.status(200).send("Jeu supprimé");
  } catch (error) {
    res
      .status(500)
      .json({ error: (error as Error).message || "Erreur serveur" });
  }
});

export default router;
