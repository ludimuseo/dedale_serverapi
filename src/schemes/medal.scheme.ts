import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";

// Interface pour définir les attributs du modèle
export interface MedalAttributes {
  id: number;
  image: string;
  level: number;
  place_id: string;
  journey_id: string;
}

// Interface pour la création (permet l'absence de `id` car il est auto-incrémenté)
interface MedalCreationAttributes extends Optional<MedalAttributes, "id"> {}

// Définition du modèle Medal
class Medal extends Model<MedalAttributes, MedalCreationAttributes> implements MedalAttributes {
  public id!: number;
  public image!: string;
  public level!: number;
  public place_id !: string;
  public journey_id !: string;
}

// Initialisation du modèle Sequelize
Medal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journey_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    tableName: "medal",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Pas de `createdAt` ni `updatedAt`
  }
);

export default Medal;
