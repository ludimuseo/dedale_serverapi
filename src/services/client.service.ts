import Client from '../schemes/client.scheme';
import type { AuthenticatedRequest } from '../utils/types';
import { AuthLog } from './auth_log.service';

export class ClientService {
  static async addClient(req: AuthenticatedRequest) {
    // Route only for OWNER role !!!!!!!!!!!!!!!
    if (!req.auth) {
      throw new Error('Authentification requise');
    }
    const role = req.auth.role.split('|');
    if (!role.find((element: string) => element == 'OWNER') === 'OWNER') {
      await AuthLog.save(req);
      return { error: 'Accès interdit : vous devez être OWNER.' };
    }

    // Check company.name and contact.email -> required
    if (req.body.company.name == '') {
      return { error: 'Le champ company.name est obligatoire.' };
    }
    if (req.body.contact.email == '') {
      return { error: 'Le champ contact.email est obligatoire.' };
    }

    // Check company.type {PARTICULIER | ASSOCIATION | ENTREPRISE}
    if (
      !['PARTICULIER', 'ASSOCIATION', 'ENTREPRISE'].includes(
        req.body.company.type
      )
    ) {
      return {
        error:
          "Le champ company.type doit être 'PARTICULIER', 'ASSOCIATION' ou 'ENTREPRISE'.",
      };
    }

    const createClient = await Client.create({
      name: req.body.company.name,
      type: req.body.company.type,
      siret: req.body.company.siret,
      tva: req.body.company.tva,
      website: req.body.company.website,
      adresse: req.body.address.address,
      city: req.body.address.city,
      postal: req.body.address.postal,
      country: req.body.address.country,
      contact: req.body.contact.name,
      email: req.body.contact.email,
      note: req.body.contact.note,
      phone: req.body.contact.tel,
      isActive: req.body.status.isActive,
    });

    return { createClient, httpCode: 201 };
  }
}
