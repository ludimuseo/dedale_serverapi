import sequelize from '../config/database';
import { DataTypes, Model } from 'sequelize';
import { User } from '../schemes/user.scheme';
import type { UserInstance } from './user.scheme';

// Définir l'interface des attributs d'Auth (pour la création, la mise à jour, etc.)
interface AuthAttributes {
  id: number;
  email: string;
  password: string;
  token: string;
  log?: number;
  creatAt?: Date;
  google_id?: string;
  google_access_token?: string;
  google_refresh_token?: string;
  google_expires_at?: string;
}

// Définir l'interface de l'instance Auth, qui étend Model
export interface AuthInstance extends Model<AuthAttributes>, AuthAttributes {
  user?: UserInstance; // Ajouter l'attribut user dans AuthInstance
}
// Définir le modèle Auth avec les attributs
const Auth = sequelize.define<AuthInstance>(
  'auth',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    log: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creatAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    google_access_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    google_refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    google_expires_at: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // Empêche Sequelize d'ajouter un "s" à la fin du nom de la table
    timestamps: false, // Dont add createdAt and updatedAt in the query
  }
);

// Définir les relations entre Auth et User
Auth.hasOne(User, { foreignKey: 'authId' });
User.belongsTo(Auth, { foreignKey: 'authId' });

// Exporter Auth et AuthInstance séparément
export { Auth };
