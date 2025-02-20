//journeys.model.ts

import sequelize from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";

// Interface pour définir les attributs du modèle
interface JourneyAttributes {
  id: number;
  duration: string;
  image: string;
  isPublished: boolean;
  isActive?: boolean;
}

// Interface pour la création (permet l'absence de `id` car il est auto-incrémenté)
export interface JourneyCreationAttributes extends Optional<JourneyAttributes, "id"> {}

// Définition du modèle Journey
class Journey extends Model<JourneyAttributes, JourneyCreationAttributes> implements JourneyAttributes {
  public id!: number;
  public duration!: string;
  public image!: string;
  public isPublished!: boolean;
  public isActive?: boolean;
}

// Initialisation du modèle Sequelize
Journey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "journey",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default Journey;
