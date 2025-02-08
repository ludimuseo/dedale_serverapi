const { DataTypes} = require("sequelize");
const Sequelize = require("../server.ts");

const Quiz = Sequelize.define("quiz", {
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

 export default Quiz;