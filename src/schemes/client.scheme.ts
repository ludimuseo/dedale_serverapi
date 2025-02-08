import sequelize from "../database";
import { Sequelize, DataTypes } from "sequelize";

const Client = sequelize.define("client", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    type: {
      type: DataTypes.STRING,
      allowNull: false
      },
    siret: {
      type: DataTypes.STRING,
      allowNull: true
      },
    tva: {
      type: DataTypes.STRING,
      allowNull: true
      },
    avatar: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      },
    adresse: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    postal: {
      type: DataTypes.STRING,
      allowNull: false
        },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
        },
    email: {
      type: DataTypes.STRING,
      allowNull: false
        },
    note: {
      type: DataTypes.BOOLEAN,
      allowNull: true
        },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
        },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
        }
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Client;