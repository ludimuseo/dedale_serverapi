import { DataTypes, Model } from 'sequelize';
import type { InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

// Définition du modèle Sequelize
export class Client_Admin extends Model<
  InferAttributes<Client_Admin>,
  InferCreationAttributes<Client_Admin>
> {
  declare id: number;
  declare client_id: number;
  declare user_id: number;
}

// Initialisation du modèle
Client_Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'client_admin',
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default Client_Admin;
