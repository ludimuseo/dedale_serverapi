// clients.service.ts = logique métier

import Client from "../schemes/client.scheme";
import Auth_Log from "../schemes/auth_log.scheme";

export class ClientService {
  
  // Add a new client with role validation
  static async addClient(clientData: any, req: any, header: any) {
    // Check if the user has the "OWNER" role
    const role = req.role.split('|');
    if (!role.includes("OWNER")) {
      const timestamp: number = Math.floor(Date.now() / 1000);
      const userAgent: string = header.headers['user-agent'];
      await Auth_Log.create({
        login_attempt: timestamp,
        ip_adresse: header.connection.remoteAddress,
        user_agent: userAgent,
        status: "failure",
        reason: "unauthorized: " + header.url,
        authId: header.auth.userId,
      });
      return { error: "Access denied: You must be an OWNER." };
    }

    // Required field validations
    if (!clientData.company?.name) return { error: "company.name is required." };
    if (!clientData.contact?.email) return { error: "contact.email is required." };

    // Validate company type
    if (!["PARTICULIER", "ASSOCIATION", "ENTREPRISE"].includes(clientData.company.type)) {
      return { error: "company.type must be 'PARTICULIER', 'ASSOCIATION', or 'ENTREPRISE'." };
    }

    try {
      const newClient = await Client.create({
        name: clientData.company.name,
        type: clientData.company.type,
        siret: clientData.company.siret,
        tva: clientData.company.tva,
        website: clientData.company.website,
        adresse: clientData.address?.address,
        city: clientData.address?.city,
        postal: clientData.address?.postal,
        country: clientData.address?.country,
        contact: clientData.contact?.name,
        email: clientData.contact.email,
        note: clientData.contact?.note,
        phone: clientData.contact?.tel,
        isActive: clientData.status?.isActive ?? true,
      });
      return newClient;
    } catch (error) {
      console.error("Error adding client:", error);
      throw error;
    }
  }

  // Retrieve all clients
  static async getAllClients() {
    try {
      return await Client.findAll();
    } catch (error) {
      console.error("Error retrieving clients:", error);
      throw error;
    }
  }

  // Retrieve a client by ID
  static async getClientById(id: string) {
    try {
      const client = await Client.findByPk(id);
      if (!client) {
        console.warn(`Client with ID ${id} not found.`);
        return null;
      }
      return client;
    } catch (error) {
      console.error(`Error retrieving client with ID ${id}:`, error);
      throw error;
    }
  }

  // Update an existing client
  static async updateClient(id: string, updateData: Partial<Client>) {
    try {
      const client = await Client.findByPk(id);
      if (!client) {
        console.warn(`Client with ID ${id} not found.`);
        return null;
      }
      await client.update(updateData);
      return client;
    } catch (error) {
      console.error(`Error updating client with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a client
  static async deleteClient(id: string) {
    try {
      const client = await Client.findByPk(id);
      if (!client) {
        console.warn(`Client with ID ${id} not found.`);
        return null;
      }
      await client.destroy();
      return { message: `Client with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting client with ID ${id}:`, error);
      throw error;
    }
  }
}
