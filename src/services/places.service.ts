//places.service.ts

import Place from "../schemes/place.scheme";

export class PlacesService {
  // Retrieve all places
  static async getAllPlaces(): Promise<InstanceType<typeof Place>[]> {
    try {
      return await Place.findAll();
    } catch (error) {
      console.error("Error retrieving places:", error);
      throw error;
    }
  }

  // Retrieve a place by ID
  static async getPlaceById(id: number): Promise<InstanceType<typeof Place> | null> {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        console.warn(`Place with ID ${id} not found.`);
        return null;
      }
      return place;
    } catch (error) {
      console.error(`Error retrieving place with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a new place
  static async addPlace(placeData: any): Promise<InstanceType<typeof Place>> {
    try {
      const newPlace = await Place.create(placeData);
      return newPlace;
    } catch (error) {
      console.error("Error adding place:", error);
      throw error;
    }
  }

  // Update an existing place
  static async updatePlace(id: number, updateData: any): Promise<InstanceType<typeof Place> | null> {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        console.warn(`Place with ID ${id} not found.`);
        return null;
      }
      await place.update(updateData);
      return place;
    } catch (error) {
      console.error(`Error updating place with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a place
  static async deletePlace(id: number): Promise<{ message: string } | null> {
    try {
      const place = await Place.findByPk(id);
      if (!place) {
        console.warn(`Place with ID ${id} not found.`);
        return null;
      }
      await place.destroy();
      return { message: `Place with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting place with ID ${id}:`, error);
      throw error;
    }
  }
}
