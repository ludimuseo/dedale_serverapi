import sequelize from "../config/database";
import { Sequelize, Model, DataTypes } from "sequelize";

const Piece = sequelize.define("piece", {
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
    isPublished: {
      type: DataTypes.BOOLEAN,
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

 export default Piece;