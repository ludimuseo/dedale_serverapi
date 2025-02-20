//index.model.ts

import { User } from "./users.model";  // Importer User avec des accolades
import { Auth } from "./auth.model";  // Importer Auth avec des accolades

// Définir les relations ici après importation des modèles
Auth.hasOne(User, { foreignKey: "authId" });
User.belongsTo(Auth, { foreignKey: "authId" });

export { User, Auth };