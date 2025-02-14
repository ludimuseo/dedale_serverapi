// src/config/firebase.config.ts => db connexion

import * as dotenv from "dotenv";
import admin from "firebase-admin";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
// charge les variables du fichier .env.development

// Initialisation de Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n",
      )?.replace(/\\r/g, "\r"), // corrige les sauts de ligne
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
