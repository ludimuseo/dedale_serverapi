//places.routes.ts

import { Router } from "express";
import { PlacesService } from "../services/places.service";

const router = Router();

// GET
router.get("/list", async (_req, res) => {
  const places = await PlacesService.getAllPlaces();
  res.json(places);
});

// POST
router.post("/create", async (req, res) => {
  await PlacesService.addPlace(req.body);
  res.status(201).send("Place added");
});

// PUT ou PATCH ?
router.put("/update/:id", async (req, res) => {
  await PlacesService.updatePlace(req.params.id, req.body);
  res.status(200).send("Place updated");
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await PlacesService.deletePlace(req.params.id);
  res.status(200).send("Place deleted");
});

export default router;
