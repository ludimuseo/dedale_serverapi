//users.routes.ts

import { Router } from "express";
import { UsersService } from "../services/users.service";
import { UserScheme } from "../schemes/users.scheme";

const router = Router();

// GET - Récupérer la liste des utilisateurs
router.get("/list", async (_req, res) => {
  try {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);  
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// GET - Récupérer un utilisateur par son ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });  
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur par ID:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });  
  }
});

// POST - Créer un nouvel utilisateur
router.post("/create", async (req, res) => {
  try {
    const userData: UserScheme = req.body;
    const newUser = await UsersService.addUser(userData);
    res.status(201).json({ message: "Utilisateur ajouté avec succès", userId: newUser.id });  
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de l'ajout de l'utilisateur" }); 
  }
});

// PATCH - Mettre à jour un utilisateur existant
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;  
    await UsersService.updateUser(id, updateData);
    res.status(200).json({ message: `Utilisateur ${id} mis à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'utilisateur" });  
  }
});

// DELETE - Supprimer un utilisateur
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await UsersService.deleteUser(id);
    res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de l'utilisateur" });  
  }
});

export default router;
