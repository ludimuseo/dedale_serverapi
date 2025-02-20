// journeys.service.ts

import { Model } from "sequelize";
import Journey from "../models/journeys.model";

export class JourneyService {
  // Retrieve all journeys
  static async getAllJourneys(): Promise<Model[]> {
    try {
      return await Journey.findAll();
    } catch (error) {
      console.error("Error retrieving journeys:", error);
      throw error;
    }
  }

  // Retrieve a journey by ID
  static async getJourneyById(id: number): Promise<Model | null> {
    try {
      const journey = await Journey.findByPk(id);
      if (!journey) {
        console.warn(`Journey with ID ${id} not found.`);
        return null;
      }
      return journey;
    } catch (error) {
      console.error(`Error retrieving journey with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a new journey
  static async addJourney(journeyData: any): Promise<Model> {
    try {
      const newJourney = await Journey.create(journeyData);
      return newJourney;
    } catch (error) {
      console.error("Error adding journey:", error);
      throw error;
    }
  }

  // Update an existing journey
  static async updateJourney(id: number, updateData: Partial<any>): Promise<Model | null> {
    try {
      const journey = await Journey.findByPk(id);
      if (!journey) {
        console.warn(`Journey with ID ${id} not found.`);
        return null;
      }
      await journey.update(updateData);
      return journey;
    } catch (error) {
      console.error(`Error updating journey with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a journey
  static async deleteJourney(id: number): Promise<{ message: string } | null> {
    try {
      const journey = await Journey.findByPk(id);
      if (!journey) {
        console.warn(`Journey with ID ${id} not found.`);
        return null;
      }
      await journey.destroy();
      return { message: `Journey with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting journey with ID ${id}:`, error);
      throw error;
    }
  }
}
