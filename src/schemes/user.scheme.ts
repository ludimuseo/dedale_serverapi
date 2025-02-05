const { DataTypes} = require("sequelize");
const Sequelize = require("../server.ts");

const User = Sequelize.define("user", {
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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
      },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false
      },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
      },
    isContrast: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      },
    isFalc: {
      type: DataTypes.BOOLEAN,
      allowNull: true
      },
    fontsize: {
      type: DataTypes.INTEGER,
      allowNull: true
      },
    language: {
      type: DataTypes.STRING,
      allowNull: false
        },
    tutorial: {
      type: DataTypes.STRING,
      allowNull: true
        },
    role: {
      type: DataTypes.STRING,
      allowNull: true
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

 export default User;