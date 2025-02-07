import sequelize from "../database";
import { DataTypes, Model } from "sequelize";

// Définir l'interface UserAttributes
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

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>("user", {
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
      model: "auth", // Nom de la table référencée
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
},
{
  freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
  timestamps: false // Dont add createdAt and updatedAt in the query
});

export { User };  // Exporter User
