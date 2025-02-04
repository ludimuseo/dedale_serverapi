const { DataTypes} = require("sequelize");
const Sequelize = require("../server.ts");

const Auth = Sequelize.define("auth", {
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
      }
      },
        {
          freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
          timestamps: false // Dont add createdAt and updatedAt in the query
 });

 export default Auth;