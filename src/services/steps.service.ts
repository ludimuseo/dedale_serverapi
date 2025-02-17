//steps.services.ts

import Step from "../schemes/step.scheme";

export class StepsService {
  // Retrieve all steps
  static async getAllSteps(): Promise<InstanceType<typeof Step>[]> { 
    try {
      return await Step.findAll();
    } catch (error) {
      console.error("Error retrieving steps:", error);
      throw error;
    }
  }

  // Retrieve a step by ID
  static async getStepById(id: number): Promise<InstanceType<typeof Step> | null> { 
    try {
      const step = await Step.findByPk(id);
      if (!step) {
        console.warn(`Step with ID ${id} not found.`);
        return null;
      }
      return step;
    } catch (error) {
      console.error(`Error retrieving step with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a new step
  static async addStep(stepData: any): Promise<InstanceType<typeof Step>> { 
    try {
      const newStep = await Step.create(stepData);
      return newStep;
    } catch (error) {
      console.error("Error adding step:", error);
      throw error;
    }
  }

  // Update an existing step
  static async updateStep(id: number, updateData: any): Promise<InstanceType<typeof Step> | null> { 
    try {
      const step = await Step.findByPk(id);
      if (!step) {
        console.warn(`Step with ID ${id} not found.`);
        return null;
      }
      await step.update(updateData);
      return step;
    } catch (error) {
      console.error(`Error updating step with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a step
  static async deleteStep(id: number): Promise<{ message: string } | null> { 
    try {
      const step = await Step.findByPk(id);
      if (!step) {
        console.warn(`Step with ID ${id} not found.`);
        return null;
      }
      await step.destroy();
      return { message: `Step with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting step with ID ${id}:`, error);
      throw error;
    }
  }
}
