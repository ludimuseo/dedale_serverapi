import { User } from "../schemes/user.scheme";  // Importer User avec des accolades
import { Auth } from "../schemes/auth.scheme";  // Importer Auth avec des accolades

// Définir les relations ici après importation des modèles
Auth.hasOne(User, { foreignKey: "authId" });
User.belongsTo(Auth, { foreignKey: "authId" });

export { User, Auth };