//pieces.models.ts

import sequelize from "../config/database";
import { DataTypes, Model, Optional } from "sequelize";

// Définition des attributs du modèle
interface PieceAttributes {
  id: number;
  name: string;
  image: string;
  isPublished: boolean;
  isActive?: boolean;
}

// Interface pour la création (où `id` est optionnel car auto-incrémenté)
export interface PieceCreationAttributes extends Optional<PieceAttributes, "id"> {}

// Définition du modèle `Piece`
class Piece extends Model<PieceAttributes, PieceCreationAttributes> implements PieceAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public isPublished!: boolean;
  public isActive?: boolean;
}

Piece.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "piece",
    freezeTableName: true,
    timestamps: false,
  }
);

export default Piece;
