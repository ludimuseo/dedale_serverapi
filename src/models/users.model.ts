// users.model.ts

import sequelize from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";

// Interface des attributs du modèle User
interface UserAttributes {
  id: number;
  name: string;
  firstname: string;
  pseudo: string;
  avatar?: string;
  isContrast?: boolean;
  isFalc?: boolean;
  fontsize?: number;
  language: string;
  tutorial?: boolean;
  role?: string;
  isActive?: boolean;
  authId?: number;
}

// Interface pour la création d'un utilisateur (id auto-incrémenté)
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Définition du modèle User avec Sequelize et TypeScript
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public firstname!: string;
  public pseudo!: string;
  public avatar?: string;
  public isContrast?: boolean;
  public isFalc?: boolean;
  public fontsize?: number;
  public language!: string;
  public tutorial?: boolean;
  public role?: string;
  public isActive?: boolean;
  public authId?: number;
}

// Initialisation du modèle Sequelize
User.init(
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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isContrast: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFalc: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fontsize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorial: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    authId: {  // Clé étrangère
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "auth",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "user",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default { User,  };
