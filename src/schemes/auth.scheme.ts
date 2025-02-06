import sequelize from "../database";
import { Sequelize, DataTypes } from "sequelize";

const Auth = sequelize.define("auth", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false
      },
    token: {
      type: DataTypes.STRING,
      allowNull: false
      },
    log: {
      type: DataTypes.STRING,
      allowNull: true
      },
    creatAt: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true
      },
    google_access_token: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    google_refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
      },
    google_expires_at: {
      type: DataTypes.TEXT,
      allowNull: true
      },
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Auth;