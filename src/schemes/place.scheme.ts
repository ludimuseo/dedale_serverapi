import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";

// Interface pour définir les attributs du modèle
interface PlaceAttributes {
  id: number;
  medal_id?: number;
  lat?: number;
  long?: number;
  type: string;
  image?: string;
  isPublished: boolean;
  isActive?: boolean;
  location_required?: boolean;
}

// Interface pour la création (permet l'absence de `id` car il est auto-incrémenté)
interface PlaceCreationAttributes extends Optional<PlaceAttributes, "id"> {}

// Définition du modèle Place
class Place extends Model<PlaceAttributes, PlaceCreationAttributes> implements PlaceAttributes {
  public id!: number;
  public medal_id?: number;
  public lat?: number;
  public long?: number;
  public type!: string;
  public image?: string;
  public isPublished!: boolean;
  public isActive?: boolean;
  public location_required?: boolean;
}

// Initialisation du modèle Sequelize
Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    medal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "medal",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    long: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
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
    location_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "place",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default Place;
