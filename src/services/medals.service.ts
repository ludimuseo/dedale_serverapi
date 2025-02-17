// medals.service.ts

import Medal from "../schemes/medal.scheme";

export class MedalService {
  // Retrieve all medals
  static async getAllMedals(): Promise<InstanceType<typeof Medal>[]> {
    try {
      return await Medal.findAll();
    } catch (error) {
      console.error("Error retrieving medals:", error);
      throw error;
    }
  }

  // Retrieve a medal by ID
  static async getMedalById(id: number): Promise<InstanceType<typeof Medal> | null> {
    try {
      const medal = await Medal.findByPk(id);
      if (!medal) {
        console.warn(`Medal with ID ${id} not found.`);
        return null;
      }
      return medal;
    } catch (error) {
      console.error(`Error retrieving medal with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a new medal
  static async addMedal(medalData: any): Promise<InstanceType<typeof Medal>> {
    try {
      const newMedal = await Medal.create(medalData);
      return newMedal;
    } catch (error) {
      console.error("Error adding medal:", error);
      throw error;
    }
  }

  // Update an existing medal
  static async updateMedal(id: number, updateData: any): Promise<InstanceType<typeof Medal> | null> {
    try {
      const medal = await Medal.findByPk(id);
      if (!medal) {
        console.warn(`Medal with ID ${id} not found.`);
        return null;
      }
      await medal.update(updateData);
      return medal;
    } catch (error) {
      console.error(`Error updating medal with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a medal
  static async deleteMedal(id: number): Promise<{ message: string } | null> {
    try {
      const medal = await Medal.findByPk(id);
      if (!medal) {
        console.warn(`Medal with ID ${id} not found.`);
        return null;
      }
      await medal.destroy();
      return { message: `Medal with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting medal with ID ${id}:`, error);
      throw error;
    }
  }
}
