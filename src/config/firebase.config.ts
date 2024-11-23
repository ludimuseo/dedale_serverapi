//src/config/firebase.config.ts => db connexion

import admin from "firebase-admin";
import * as serviceAccount from "./dedale-db58f-firebase-adminsdk-swtr6-8580a17964.json"; 


// Initialisation de Firebase si aucune application n'est encore initialisée
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Assurer le bon typage
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
