import { Router } from "express";
import { GamesService } from "../services/games.service";
import { GameScheme } from "../schemes/games.scheme"; 

const router = Router();

// GET - Récupérer la liste des jeux
router.get("/list", async (_req, res) => {
  try {
    const games = await GamesService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// GET - Récupérer un jeu par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await GamesService.getGameById(id);
    if (!game) {
      return res.status(404).json({ message: `Jeu avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// POST - Créer un nouveau jeu
router.post("/create", async (req, res) => {
  try {
    const gameData: GameScheme = req.body;
    const newGame = await GamesService.addGame(gameData);
    res.status(201).json({ message: "Jeu ajouté avec succès", gameId: newGame.id });
  } catch (error) {
    console.error("Erreur lors de l'ajout du jeu:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du jeu" });
  }
});

// PATCH - Mettre à jour un jeu existant
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await GamesService.updateGame(id, updateData);
    res.status(200).json({ message: `Jeu ${id} mis à jour avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du jeu:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du jeu" });
  }
});

// DELETE - Supprimer un jeu
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await GamesService.deleteGame(id);
    res.status(200).json({ message: `Jeu ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression du jeu:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du jeu" });
  }
});

export default router;

