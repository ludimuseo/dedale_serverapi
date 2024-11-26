//src/server.ts

import express from "express";
import clientsRouter from "./routes/clients.route";


const app = express();
app.use(express.json());

// Routes
app.use("/clients", clientsRouter);





//--------------------------------------------------------------
//TODO Route de test pour la connexion à Firestore
//TODO Faire les routes
//TODO Faire les schémas
//TODO Faire les services
//TODO valider les données avant de les envoyer à Firestore avec zod
//TODO Configurer le serveur Express pour écouter les requêtes HTTP
//TODO Gestion des erreurs et validation des données avec express-validator
//TODO Sécu
//TODO Tests avec Jest 
//--------------------------------------------------------------

app.listen(4000, async () => {
    console.log("Le serveur est lancé sur le port 4000");
  });