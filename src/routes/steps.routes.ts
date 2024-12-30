//steps.routes.ts

import { Router } from "express";
import { StepsService } from "../services/steps.service";
import { StepScheme } from "../schemes/steps.scheme";

const router = Router();

// GET - Récupérer la liste des étapes
router.get("/list", async (_req, res) => {
  try {
    const steps = await StepsService.getAllSteps();
    res.status(200).json(steps);  
  } catch (error) {
    console.error("Erreur lors de la récupération des étapes:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// GET - Récupérer une étape par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const steps = await StepsService.getStepById(id);
    if (!steps) {
      return res.status(404).json({ message: `Etape avec l'ID ${id} introuvable.` });  
    }
    res.status(200).json(steps); 
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étape par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// POST - Créer une nouvelle étape
router.post("/create", async (req, res) => {
  try {
    const stepData: StepScheme  = req.body;
    const newStep = await StepsService.addStep(stepData);
    res.status(201).json({ message: "Etape ajoutée avec succès", stepId: newStep.id });  
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'étape:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de l'étape" }); 
  }
});

// PATCH - Mettre à jour une étape existante
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;  
    await StepsService.updateSteps(id, updateData);
    res.status(200).json({ message: `Etape ${id} mis à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étape:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'étape" });  
  }
});

// DELETE - Supprimer une étape
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await StepsService.deleteSteps(id);
    res.status(200).json({ message: `Etape ${id} supprimé avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression de l'étape:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de l'étape" });  
  }
});

export default router;