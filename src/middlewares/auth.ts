import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../schemes/user.scheme"; // Vérifie le bon chemin vers ton modèle User
import { AuthenticatedRequest } from "../utils/types"; // Importer le type étendu

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const typedReq = req as AuthenticatedRequest;
    try {
        const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

        // Récupérer le token
        const token = req.headers.authorization?.split(' ')[1];

        // Si pas de token, erreur 401
        if (!token) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Vérifier et décoder le token
        if (!RANDOM_TOKEN_SECRET) {
            return res.status(500).json({ message: "Server error: Missing token secret" });
        }
        const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET) as jwt.JwtPayload;

if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
    return res.status(401).json({ message: "Invalid Token" });
}

const userId = decodedToken.userId as number;

        // Vérifier si l'ID utilisateur est bien extrait
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Trouver le rôle de l'utilisateur
        const user = await User.findOne({
            where: { id: userId },
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Ajouter auth à req
        typedReq.auth = {
            userId: user.id,
            role: user.role ?? "USER",
        };

        next();
    } catch (error) {
        console.error("Erreur dans auth.ts :", error);
        res.status(401).json({ message: "Token error" });
    }
};

export default authMiddleware;
