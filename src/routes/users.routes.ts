//users.routes.ts

import { Router, Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { UserScheme } from "../schemes/users.scheme";
import { validateUserCreation, validateUserUpdate, validateId } from "../middlewares/validation";
import { validationResult } from "express-validator";


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
router.get("/find/:id",  validateId, async (req: Request, res: Response) => {

  // Vérifier la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
router.post("/create",validateUserCreation, async (req: Request, res: Response) => {
  // Vérifier la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
router.patch("/update/:id", validateId, validateUserUpdate, async (req: Request, res: Response) => {

    // Vérifier si l'utilisateur existe avant la validation des champs
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }
  
    // Appliquer la validation des champs après avoir validé l'ID
    await Promise.all(validateUserUpdate.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
  try {
    const updateData = req.body;  
    await UsersService.updateUser(id, updateData);
    res.status(200).json({ message: `Utilisateur ${id} mis à jour avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'utilisateur" });  
  }
});

// DELETE - Supprimer un utilisateur
router.delete("/delete/:id", validateId, async (req: Request, res: Response) => {
  // Vérifier la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    const { id } = req.params;

    // Vérifier si l'utilisateur existe avant suppression
    const user = await UsersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
    }

    await UsersService.deleteUser(id);
    res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès.` });  
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne lors de la suppression de l'utilisateur" });  
  }
});

export default router;
