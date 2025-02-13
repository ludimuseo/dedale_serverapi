import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";  // Assure-toi que ce fichier exporte une instance Sequelize

// Interface pour définir les attributs du modèle
interface ClientAttributes {
  id: number;
  name: string;
  type: string;
  siret?: string;
  tva?: string;
  adresse: string;
  city: string;
  postal: string;
  country: string;
  contact?: string;
  email: string;
  website: Text;
  note?: Text;
  phone: string;
  isActive: boolean;
}

// Interface pour la création (permet l'absence de `id` car il est auto-incrémenté)
interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

// Définition du modèle Client
class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public type!: string;
  public siret?: string;
  public tva?: string;
  public adresse!: string;
  public city!: string;
  public postal!: string;
  public country!: string;
  public contact?: string;
  public email!: string;
  public website!: Text
  public note?: Text;
  public phone!: string;
  public isActive!: boolean;
}

// Initialisation du modèle Sequelize
Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    siret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tva: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "client",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default Client;
