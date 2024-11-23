//src/server.ts

import express from "express";
import { db } from "./config/firebase.config";

const app = express();

app.use(express.json());

//TODO Route de test pour la connexion à Firestore - à revoir
app.get("/test", async (_req, res) => {
    try {
      // Ajouter un document à la collection 'test'
      const docRef = db.collection("test").doc("testDoc");
      
      // Vérification de l'ajout
      await docRef.set({
        testField: "C'est une vérification de connexion !",
        timestamp: new Date(),
      });
      
      // Succès si le document a été ajouté
      res.status(200).json({ message: "Connexion à Firestore réussie" });
    } catch (error) {
      console.error("Erreur de connexion Firestore :", error);
      res.status(500).json({ message: "Erreur de connexion à Firestore" });
    }
  });

//TODO Faire les routes
//TODO Configurer le serveur Express pour écouter les requêtes HTTP
//TODO Gestion des erreurs et validation des données avec express-validator
//TODO Sécu
//TODO Tests avec Jest 


app.listen(4000, async () => {
    console.log("Le serveur est lancé sur le port 4000");
  });