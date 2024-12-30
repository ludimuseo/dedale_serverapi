// medals.routes.ts

import { Router } from "express";
import { MedalsService } from "../services/medals.service";
import { MedalScheme } from "../schemes/medals.scheme";

const router = Router();

// GET - Récupérer la liste des médailles
router.get("/list", async (_req, res) => {
  try {
    const medals = await MedalsService.getAllMedals();
    res.status(200).json(medals);  
  } catch (error) {
    console.error("Erreur lors de la récupération des médailles:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// GET - Récupérer une médaille par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const medal = await MedalsService.getMedalById(id);
    if (!medal) {
      return res.status(404).json({ message: `Médaille avec l'ID ${id} introuvable.` });  
    }
    res.status(200).json(medal); 
  } catch (error) {
    console.error("Erreur lors de la récupération de la médaille par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// POST - Créer une nouvelle médaille
router.post("/create", async (req, res) => {
  try {
    const medalData: MedalScheme = req.body;
    const newMedal = await MedalsService.addMedal(medalData);
    res.status(201).json({ message: "Médaille ajoutée avec succès", medalId: newMedal.id });  
  } catch (error) {
    console.error("Erreur lors de l'ajout de la médaille:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de la médaille" }); 
  }
});

// PATCH - Mettre à jour une médaille existante
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;  
    await MedalsService.updateMedal(id, updateData);
    res.status(200).json({ message: `Médaille ${id} mise à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la médaille:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de la médaille" });  
  }
});

// DELETE - Supprimer une médaille
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await MedalsService.deleteMedal(id);
    res.status(200).json({ message: `Médaille ${id} supprimée avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression de la médaille:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de la médaille" });  
  }
});

export default router;
