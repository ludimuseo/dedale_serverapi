import Client from "../schemes/client.scheme";
import  Auth_Log  from "../schemes/auth_log.scheme";
import { AuthenticatedRequest } from "../utils/types"; // Importer le type étendu

export class ClientService {
    static async addClient(clientData: any, req: AuthenticatedRequest) {

// Route only for OWNER role !!!!!!!!!!!!!!!
console.log(req);

const role = req.auth.role.split('|');
if(role.find((element: string) => element == "OWNER") === "OWNER"){null}else{
    const timestamp: number = Math.floor(Date.now() / 1000);
    const userAgent: string = req.headers["user-agent"] || "Unknown";
    const auth_Log = await Auth_Log.create({
        login_attempt: timestamp,
        ip_adresse: req.socket.remoteAddress || req.connection?.remoteAddress || "Unknown",
        user_agent: userAgent,
        status: "failure",
        reason: "unauthorized: " + req.url,
        authId: req.auth.userId
      });
    return { error: "Accès interdit : vous devez être OWNER." };
}

// Check company.name and contact.email -> required
if(clientData.company.name == ""){return {error : "Le champ company.name est obligatoire." }}
if(clientData.contact.email == ""){return {error : "Le champ contact.email est obligatoire." }}

// Check company.type {PARTICULIER | ASSOCIATION | ENTREPRISE}
if (!["PARTICULIER", "ASSOCIATION", "ENTREPRISE"].includes(clientData.company.type)) {
    return { error: "Le champ company.type doit être 'PARTICULIER', 'ASSOCIATION' ou 'ENTREPRISE'." };
  }

const createClient = await Client.create({
    name: clientData.company.name,
    type: clientData.company.type,
    siret: clientData.company.siret,
    tva: clientData.company.tva,
    website: clientData.company.website,
    adresse: clientData.address.address,
    city: clientData.address.city,
    postal: clientData.address.postal,
    country: clientData.address.country,
    contact: clientData.contact.name,
    email: clientData.contact.email,
    note: clientData.contact.note,
    phone: clientData.contact.tel,
    isActive: clientData.status.isActive
  });
  return createClient.dataValues;
  

    }


}