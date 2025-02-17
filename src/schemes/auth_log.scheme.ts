import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";  // Assure-toi que ce fichier exporte bien une instance Sequelize

// Définir les attributs du modèle
interface Auth_LogAttributes {
  log_id: number;
  login_attempt: number;
  ip_adresse: string;
  user_agent: string;
  status?: string;
  reason?: string;
  authId?: number;
}

// Permettre la création de logs sans définir `log_id` (auto-incrémenté)
interface Auth_LogCreationAttributes extends Optional<Auth_LogAttributes, "log_id"> {}

// Définition du modèle Sequelize
class Auth_Log extends Model<Auth_LogAttributes, Auth_LogCreationAttributes> implements Auth_LogAttributes {
  public log_id!: number;
  public login_attempt!: number;
  public ip_adresse!: string;
  public user_agent!: string;
  public status?: string;
  public reason?: string;
  public authId?: number;
}

// Initialisation du modèle
Auth_Log.init(
  {
    log_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    login_attempt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ip_adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "auth", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "auth_log",
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    timestamps: false, // Désactive createdAt et updatedAt
  }
);

export default Auth_Log;
