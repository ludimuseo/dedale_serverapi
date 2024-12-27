//places.routes.ts

import { Router } from "express";
import { PlacesService } from "../services/places.service";
import { PlaceScheme } from "../schemes/places.scheme";

const router = Router();

// GET Récupérer la liste des lieux
router.get("/list", async (_req, res) => {
  try {
   const places = await PlacesService.getAllPlaces();
   res.status(200).json(places); 
} catch (error) {
  console.error("Erreur lors de la récupération des lieux:", error);
  res.status(500).json({ message: "Erreur interne du serveur" });  
}
});


// GET - Récupérer un lieu par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const place = await PlacesService.getPlaceById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Lieu introuvable" });
    }
    res.status(200).json(place); 
  } catch (error) {
    console.error("Erreur lors de la récupération du lieu par ID:", error);
    res.status(500).json({ error: "Erreur serveur" });
    }
  });



// POST - Créer un nouveau lieu 
router.post("/create", async (req, res) => {
  try {
    const placeData: PlaceScheme = req.body;
    const newPlace = await PlacesService.addPlace(placeData);
    res.status(201).json({ message: "Lieu ajouté avec succès", placeId: newPlace.id });  
  } catch (error) {
    console.error("Erreur lors de l'ajout du lieu:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout du lieu" }); 
  }
});


// PATCH - Mettre à jour un lieu existant
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } =req.params;
    const updateData = req.body;
    await PlacesService.updatePlace(id,updateData);
    res.status(200).json({ message: `Lieu ${id} mis à jour avec succès.` }); 
  } catch (error) {
    console.error("Erreur lors de la mise à jour du lieu:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour du lieu" });
  }
});

// DELETE - Supprimer un lieu
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PlacesService.deletePlace(id);
    res.status(200).json({ message: `Lieu ${id} supprimé avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression du lieu:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression du lieu" });  
  }
});
 

export default router;
