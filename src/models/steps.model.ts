//steps.model.ts

import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// Interface pour définir les attributs du modèle
interface StepAttributes {
  id: number;
  image: string;
  lat?: string;
  long?: string;
  isPublished: boolean;
  isActive?: boolean;
}

// Interface pour la création (permet l'absence de `id` car il est auto-incrémenté)
interface StepCreationAttributes extends Optional<StepAttributes, "id"> {}

// Définition du modèle Step
class Step extends Model<StepAttributes, StepCreationAttributes> implements StepAttributes {
  public id!: number;
  public image!: string;
  public lat?: string;
  public long?: string;
  public isPublished!: boolean;
  public isActive?: boolean;
}

// Initialisation du modèle Sequelize
Step.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    long: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "step",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default Step;
