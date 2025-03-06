import sequelize from '../config/database';
import { DataTypes } from 'sequelize';

export interface DescriptionData {
  desc_language: string;
  clientId: number;
  desc_id: number;
  desc_order: number;
  text: string;
  image_file: string;
  image_alt: string;
  audio_file: string;
  audio_desc: string;
  is_falc?: boolean;
  is_certified_falc?: boolean;
  createdby?: number;
  certifiedBy?: number | null;
}

const Description = sequelize.define(
  'description',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place', // Assurez-vous que le modèle Place est bien défini
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    desc_language: {
      type: DataTypes.STRING(2),
      allowNull: false,
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
    desc_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audio_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audio_desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdby: {
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
      defaultValue: null,
      references: {
        model: 'user', // Assurez-vous que le modèle Place est bien défini
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    is_falc: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_certified_falc: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true, // Empêche Sequelize d'ajouter un "s" au nom de la table
    timestamps: false, // Ne pas ajouter createdAt et updatedAt automatiquement
  }
);

export default Description;
