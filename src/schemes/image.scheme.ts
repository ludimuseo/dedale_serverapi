const { DataTypes} = require("sequelize");
const Sequelize = require("../server.ts");

const Image = Sequelize.define("image", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    alt: {
      type: DataTypes.STRING,
      allowNull: true
      }
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Image;