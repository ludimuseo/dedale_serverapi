//auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User  from "../models/users.model";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

        // Récupérer le token
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        if (!RANDOM_TOKEN_SECRET) {
            return res.status(500).json({ message: "Server error: Missing token secret" });
        }

        // Vérifier et décoder le token
        const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET) as jwt.JwtPayload;

        if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.userId) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const userId = decodedToken.userId as number;

        if (!userId) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Trouver l'utilisateur
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        console.log("Type de req :", req);
        req.auth = {
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
