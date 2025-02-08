// Use this file to hash your password with 12 rounds of bcrypt
// This is util to save user in DB until make a create user route is ready
// This is will be deleted after !!!!

// run: node hash.js

const bcrypt = require('bcrypt');
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
const SALT = Number(process.env.SALT);

const passwd = "yourPassword";

bcrypt.genSalt(SALT)
    .then(salt => {
        return bcrypt.hash(passwd, salt);  // On passe ici le mot de passe et le salt
    })
    .then(hash => {
        console.log(hash);  // Affiche le hash généré
    })
    .catch(error => {
        console.error("Erreur:", error);  // Capture les erreurs potentielles
    });
