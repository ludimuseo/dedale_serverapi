import sequelize from "../config/database";
import { Sequelize, DataTypes } from "sequelize";

const Medal = sequelize.define("medal", {
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
      }
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Medal;