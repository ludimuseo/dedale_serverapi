// users.service.ts

import { User } from "../schemes/user.scheme";

export class UsersService {
  // Retrieve all users
  static async getAllUsers(): Promise<InstanceType<typeof User>[]> {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
    }
  }

  // Retrieve a user by ID
  static async getUserById(id: number):Promise<InstanceType<typeof User> | null> { 
    try {
      const user = await User.findByPk(id);
      if (!user) {
        console.warn(`User with ID ${id} not found.`);
        return null;
      }
      return user;
    } catch (error) {
      console.error(`Error retrieving user with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a new user
  static async addUser(userData: any): Promise<InstanceType<typeof User>> {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  // Update an existing user
  static async updateUser(id: number, updateData: any): Promise<InstanceType<typeof User> | null> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        console.warn(`User with ID ${id} not found.`);
        return null;
      }
      await user.update(updateData);
      return user;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a user
  static async deleteUser(id: number): Promise<{ message: string } | null> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        console.warn(`User with ID ${id} not found.`);
        return null;
      }
      await user.destroy();
      return { message: `User with ID ${id} deleted.` };
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }
}
