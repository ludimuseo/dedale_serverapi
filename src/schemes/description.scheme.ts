import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";

// Interface pour définir les attributs du modèle
interface DescriptionAttributes {
  id: number;
  code_language: string;
  standard_title?: string;
  falc_title?: string;
  standard?: string;
  falc?: string;
  falc_certified?: boolean;
  audio?: string;
  audio_falc?: string;
  createdAt?: number;
  updatedAt?: number;
  place_id: number;
}

// Interface pour la création (permet l'absence de `id` car il est auto-incrémenté)
interface DescriptionCreationAttributes extends Optional<DescriptionAttributes, "id"> {}

// Définition du modèle Description
class Description extends Model<DescriptionAttributes, DescriptionCreationAttributes> implements DescriptionAttributes {
  public id!: number;
  public code_language!: string;
  public standard_title?: string;
  public falc_title?: string;
  public standard?: string;
  public falc?: string;
  public falc_certified?: boolean;
  public audio?: string;
  public audio_falc?: string;
  public createdAt?: number;
  public updatedAt?: number;
  public place_id!: number;
}

// Initialisation du modèle Sequelize
Description.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code_language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    standard_title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    falc_title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    standard: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    falc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    falc_certified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    audio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    audio_falc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "place",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "description",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: true, // Sequelize ajoutera createdAt et updatedAt automatiquement
  }
);

export default Description;
