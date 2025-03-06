import sequelize from '../config/database';
import { DataTypes } from 'sequelize';

const Place = sequelize.define(
  'place',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user', // Assurez-vous que le modèle Place est bien défini
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    certifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user', // Assurez-vous que le modèle Place est bien défini
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    long: {
      type: DataTypes.FLOAT,
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
    location_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client', // Assurez-vous que le modèle Place est bien défini
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
    timestamps: false, // Dont add createdAt and updatedAt in the query
  }
);

export default Place;
