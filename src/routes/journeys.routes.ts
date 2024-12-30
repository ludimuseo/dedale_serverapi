//journeys.route.ts

import { Router } from "express";
import { JourneysService } from "../services/journeys.service";
import { JourneyScheme } from "../schemes/journeys.scheme";

const router = Router();

// GET - Récupérer la liste des parcours
router.get("/list", async (_req, res) => {
  try {
    const journeys = await JourneysService.getAllJourneys();
    res.status(200).json(journeys);  
  } catch (error) {
    console.error("Erreur lors de la récupération des parcours:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// GET - Récupérer un parcours par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await JourneysService.getJourneyById(id);
    if (!journey) {
      return res.status(404).json({ message: `Journey avec l'ID ${id} introuvable.` });  
    }
    res.status(200).json(journey); 
  } catch (error) {
    console.error("Erreur lors de la récupération du parcours par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// POST - Créer un nouveau parcours
router.post("/create", async (req, res) => {
  try {
    const journeyData: JourneyScheme = req.body;
    const newJourney = await JourneysService.addJourney(journeyData);
    res.status(201).json({ message: "Journey ajoutée avec succès", journeyId: newJourney.id });  
  } catch (error) {
    console.error("Erreur lors de l'ajout du parcours:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du parcours" }); 
  }
});

// PATCH - Mettre à jour un parcours existant
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;  
    await JourneysService.updateJourney(id, updateData);
    res.status(200).json({ message: `Journey ${id} mise à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour du parcours", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du parcours" });  
  }
});

// DELETE - Supprimer un parcours
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await JourneysService.deleteJourney(id);
    res.status(200).json({ message: `Journey ${id} supprimée avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression du parcours:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du parcours" });  
  }
});

export default router;
