const { DataTypes} = require("sequelize");
const Sequelize = require("../server.ts");

const Medal = Sequelize.define("medal", {
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
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à "user"
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Medal;