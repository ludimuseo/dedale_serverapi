import sequelize from "../config/database";
import { Sequelize, Model, DataTypes } from "sequelize";

const Step = sequelize.define("step", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
      },
    lat: {
        type: DataTypes.STRING,
        allowNull: true
      },
    long: {
      type: DataTypes.STRING,
      allowNull: true
      },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false
      },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      }
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Step;