//client.service.ts

import { db } from "../config/firebase.config";
import { ClientScheme } from "../schemes/clients.scheme"; // Import de l'interface

// Définition de la classe ClientsService qui gère les opérations sur clients
export class ClientsService {
  // Récupérer tous les clients
  static async getAllClients(): Promise<(ClientScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection("clients").get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ClientScheme & { id: string }));
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
      throw error;
    }
  }

  // Ajouter un nouveau client
  static async addClient(clientData: ClientScheme): Promise<void> {
    try {
      await db.collection("clients").add(clientData);
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
      throw error;
    }
  }

  // Mettre à jour un client existant
  static async updateClient(id: string, updateData: Partial<ClientScheme>): Promise<void> {
    try {
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

