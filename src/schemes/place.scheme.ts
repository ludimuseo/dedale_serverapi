import sequelize from '../config/database';
import { DataTypes } from 'sequelize';

const Place = sequelize.define(
  'place',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    long: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => Math.floor(Date.now() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    client_id: {
      // Clé étrangère
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client', // Nom de la table référencée
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
    timestamps: false, // Dont add createdAt and updatedAt in the query
  }
);

export default Place;
