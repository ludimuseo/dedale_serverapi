//places.service.ts

import { db } from '../config/firebase.config';
import { AuthenticatedRequest } from '../utils/types';

import { PlaceScheme } from '../schemes/places.scheme';
import Auth_Log from '../schemes/auth_log.scheme';
import Place from '../schemes/place.scheme';
import Medal from '../schemes/medal.scheme';
import Description from '../schemes/description.scheme';

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

    // Only for AWNER, ADMIN, SUPERADMIN
    if (!req.auth) {
      throw new Error('Authentification requise');
    }
    const role = req.auth.role.split('|');
    if (['OWNER', 'ADMIN', 'SUPERADMIN'].some((r) => role.includes(r))) {
      null;
    } else {
      const timestamp: number = Math.floor(Date.now() / 1000);
      const userAgent: string = req.headers['user-agent'] ?? 'Unknown';
      const auth_Log = await Auth_Log.create({
        login_attempt: timestamp,
        ip_adresse: req.socket.remoteAddress ?? 'Unknown',
        user_agent: userAgent,
        status: 'failure',
        reason: 'unauthorized: ' + req.url,
        authId: req.auth.userId,
      });
      return { error: 'Access denied.' };
    }

    try {
      let medal = null;
      if (req.body.medalId !== null) {
        medal = await Medal.findOne({
          where: { id: req.body.medalId },
        });
      }

      const adress = req.body.address;
      const audio = req.body.audio;
      const content = req.body.content;
      const coords = req.body.coords;
      const description = req.body.description;
      const name = req.body.name;
      const status = req.body.status;

      // Check content.type
      if (!['MUSEUM', 'CASTLE', 'OUTDOOR'].includes(content.type)) {
        return { error: "Type must be 'MUSEUM', 'CASTLE' or 'OUTDOOR'." };
      }

      // Add place in DB and get id
      const createPlace = await Place.create({
        medal_id: req.body.medalId,
        lat: coords.lat,
        long: coords.lon,
        type: content.type,
        image: content.image,
        isPublished: status.isPublished,
        isActive: status.isActive,
        location_required: coords.isLocationRequired,
      });
      console.log(req.body.description);
      return createPlace.dataValues.id;

      // Add description in DB
      // const createDescription = await Description.create({
      //   place_id: createPlace.dataValues.id,
      //   code_language: coords.lat,
      //   standard_title: coords.lon,
      //   standard: content.type,
      //   falc: content.image,
      //   falc_certified: status.isPublished,
      //   audio: status.isActive,
      //   audio_falc: coords.isLocationRequired,
      //   createdAt: coords.isLocationRequired,
      //   updatedAt: coords.isLocationRequired,
      // });
    } catch (error) {
      console.error("Erreur lors de l'ajout du lieu:", error);
      return { error: 'Erreur interne du serveur' };
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
