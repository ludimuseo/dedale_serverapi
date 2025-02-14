// places.routes.ts

import { Router } from "express";
import { PlacesService } from "../services/places.service";

const router = Router();

// GET
router.get("/list", async (_req, res) => {
  const places = await PlacesService.getAllPlaces();
  res.json(places);
});

// GET place by ID
router.get("/find/:id", async (req, res) => {
  try {
    const place = await PlacesService.getPlaceById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Lieu introuvable" });
    }
    res.json(place);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
});

// POST
router.post("/create", async (req, res) => {
  await PlacesService.addPlace(req.body);
  res.status(201).send("Place added");
});

// PATCH
router.patch("/update/:id", async (req, res) => {
  try {
    await PlacesService.updatePlace(req.params.id, req.body);
    res.status(200).send("Place updated");
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await PlacesService.deletePlace(req.params.id);
  res.status(200).send("Place deleted");
});

export default router;
