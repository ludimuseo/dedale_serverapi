// clients.service.ts

import { db } from "../config/firebase.config";
import { ClientScheme } from "../schemes/clients.scheme"; 


export class ClientsService {
  // Récupérer tous les clients
  static async getAllClients(): Promise<(ClientScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection("clients").get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }) as ClientScheme & { id: string });
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
      throw error;
    }
  }

  // Récupérer un client par son ID
  static async getClientById(
    id: string
  ): Promise<(ClientScheme & { id: string }) | null> {
    try {
      const doc = await db.collection("clients").doc(id).get();
      if (!doc.exists) {
        console.warn(`Client avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as ClientScheme & { id: string };
    } catch (error) {
      console.error(`Erreur lors de la récupération du client avec l'ID ${id}:`, error);
      throw error;
    }
  }

  // Ajouter un nouveau client
  static async addClient(
    clientData: ClientScheme
  ): Promise<{ id: string }> { // On retourne l'ID du client
    try {
      const docRef = await db.collection("clients").add(clientData); 
      return { id: docRef.id }; // Retourner l'ID du document créé
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
      throw error;
    }
  }

// Mettre à jour un client existant
static async updateClient(
  id: string,
  updateData: Partial<ClientScheme>
): Promise<void> {
  try {
    ;
    await db.collection("clients").doc(id).update(updateData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    throw error;
  }
}


  // Supprimer un client
  static async deleteClient(id: string): Promise<void> {
    try {
      await db.collection("clients").doc(id).delete(); 
    } catch (error) {
      console.error("Erreur lors de la suppression du client:", error);
      throw error;
    }
  }
}
