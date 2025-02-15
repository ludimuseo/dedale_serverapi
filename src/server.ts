// src/server.ts

import express from "express";
import clientsRouter from "./routes/clients.route";
import placesRouter from "./routes/places.routes";
import gamesRouter from "./routes/games.routes";

const app = express();
app.use(express.json());

// Routes
app.use("/clients", clientsRouter);
app.use("/places", placesRouter);
app.use("/games", gamesRouter);

//--------------------------------------------------------------
//TODO Faire les routes = ajoutergetbyid en +
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
