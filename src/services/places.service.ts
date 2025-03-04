//places.service.ts

import { db } from '../config/firebase.config';
import { AuthenticatedRequest } from '../utils/types';

import { PlaceScheme } from '../schemes/places.scheme';
import Auth_Log from '../schemes/auth_log.scheme';
import Place from '../schemes/place.scheme';
// import Medal from '../schemes/medal.scheme';
import Description from '../schemes/description.scheme';
import { DescriptionData } from '../schemes/description.scheme';

export class PlacesService {
  // Récupérer toutes les lieux
  static async getAllPlaces(): Promise<(PlaceScheme & { id: string })[]> {
    try {
      const snapshot = await db.collection('places').get();
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as PlaceScheme & { id: string }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des lieux:', error);
      throw error;
    }
  }

  // Récupérer un lieu par son ID
  static async getPlaceById(
    id: string
  ): Promise<(PlaceScheme & { id: string }) | null> {
    try {
      const doc = await db.collection('places').doc(id).get();
      if (!doc.exists) {
        console.warn(`Lieu avec l'ID ${id} introuvable.`);
        return null;
      }
      return { id: doc.id, ...doc.data() } as PlaceScheme & { id: string };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du lieu avec l'ID ${id}:`,
        error
      );
      throw error;
    }
  }

  // Ajouter un nouveau lieu
  static async addPlace(req: AuthenticatedRequest) {
    // On retourne l'ID du lieu

    // Only for OWNER, ADMIN, SUPERADMIN
    if (!req.auth) {
      throw new Error('Authentification requise');
    }
    const role = req.auth.role;
    if (['OWNER', 'ADMIN', 'SUPERADMIN'].some((r) => role.includes(r))) {
      null;
    } else {
      const timestamp: number = Math.floor(Date.now() / 1000);
      const userAgent: string = req.headers['user-agent'] ?? 'Unknown';
      const cleanIp = req.socket.remoteAddress?.includes('::ffff:')
        ? req.socket.remoteAddress.split('::ffff:')[1]
        : (req.socket.remoteAddress ?? 'Unknown');

      await Auth_Log.create({
        login_attempt: timestamp,
        ip_adresse: cleanIp,
        user_agent: userAgent,
        status: 'failure',
        reason: 'unauthorized: ' + req.url,
        authId: req.auth.userId,
      });
      return { error: 'Access denied.' };
    }

    try {
      // Check content.type
      if (!['MUSEUM', 'CASTLE', 'OUTDOOR'].includes(req.body.place.type)) {
        return { error: "Type must be 'MUSEUM', 'CASTLE' or 'OUTDOOR'." };
      }

      // Add place in DB and get id

      const createPlace = await Place.create({
        createdBy: req.body.place.createdBy,
        clientId: req.body.place.clientId,
        name: req.body.place.name,
        lat: req.body.place.lat,
        long: req.body.place.lon,
        type: req.body.place.type,
        image: req.body.place.image,
        location_required: req.body.place.locationRequired ?? false,
        isPublished: req.body.place.isPublished ?? false,
        isActive: req.body.place.isActive ?? false,
      });

      // Add description in DB
      // check if desc exist
      if (req.body.description && req.body.description.length > 0) {
        const descriptionsToInsert = req.body.description.map(
          (desc: DescriptionData) => ({
            place_id: createPlace.dataValues.id,
            desc_language: desc.desc_language,
            clientId: desc.clientId,
            desc_id: desc.desc_id,
            desc_order: desc.desc_order,
            text: desc.text,
            image_file: desc.image_file,
            image_alt: desc.image_alt,
            audio_file: desc.audio_file,
            audio_desc: desc.audio_desc,
            is_falc: desc.is_falc ?? false,
            is_certified_falc: desc.is_certified_falc ?? false,
            createdby: desc.createdby ?? 0,
            certifiedBy: desc.certifiedBy ?? null,
          })
        );

        // Send all description in DB
        await Description.bulkCreate(descriptionsToInsert);
        return createPlace.dataValues.id;
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du lieu:", error);
      return { error: 'Erreur interne du serveur' };
    }
  }

  // Activer/Desactiver un lieu
  static async activePlace(req: AuthenticatedRequest) {
    // On retourne l'ID du lieu

    // Only for OWNER, ADMIN, SUPERADMIN
    
    const role = req.auth.role;
    if (['OWNER'].some((r) => role.includes(r))) {
      null;
    } else {
      const timestamp: number = Math.floor(Date.now() / 1000);
      const userAgent: string = req.headers['user-agent'] ?? 'Unknown';
      const cleanIp = req.socket.remoteAddress?.includes('::ffff:')
        ? req.socket.remoteAddress.split('::ffff:')[1]
        : (req.socket.remoteAddress ?? 'Unknown');

      await Auth_Log.create({
        login_attempt: timestamp,
        ip_adresse: cleanIp,
        user_agent: userAgent,
        status: 'failure',
        reason: 'unauthorized: ' + req.url,
        authId: req.auth.userId,
      });
      return { httpCode: 403 };
    }

    try {
      
      const place = await Place.findOne({
        where: { id: req.body.place_id },
      });
      if(place) { // Place exist
        const update = await Place.update(
          { isActive: req.body.isActive },
          {
            where: {
              id: req.body.place_id,
            },
          },
        );
        if(update) {return { httpCode: 200 };} else { throw new Error(); }
        
      } else {
        return { httpCode: 404 };
      }
      
    } catch (error) {
      console.error("Erreur lors de l'activation/désaction:", error);
      return { httpCode: 500 };
    }
  }

  // Mettre à jour un lieu existant
  static async updatePlace(
    id: string,
    updateData: Partial<PlaceScheme>
  ): Promise<void> {
    try {
      // Vérifie que des données ont été envoyées pour la mise à jour
      if (Object.keys(updateData).length === 0) {
        throw new Error('Aucune donnée à mettre à jour');
      }

      // Effectuer la mise à jour partielle
      await db.collection('places').doc(id).update(updateData);

      console.log(`Place ${id} mise à jour avec succès`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lieu :');
      throw error;
    }
  }

  // Supprimer un lieu
  static async deletePlace(id: string): Promise<void> {
    try {
      await db.collection('places').doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression du lieu:', error);
      throw error;
    }
  }
}
