// pieces.controller.ts

import { Request, Response, NextFunction } from 'express';
import { PiecesService } from '../services/pieces.service';
import { validationResult } from 'express-validator';

/**
 * Récupérer toutes les pièces
 */
export const getAllPieces = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pieces = await PiecesService.getAllPieces();
    res.status(200).json(pieces);
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer une pièce par son ID
 */
export const getPieceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const piece = await PiecesService.getPieceById(id);
    if (!piece) {
      return res
        .status(404)
        .json({ message: `Pièce avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(piece);
  } catch (error) {
    next(error);
  }
};

/**
 * Ajouter une nouvelle pièce
 */
export const createPiece = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const pieceData = req.body;
    const newPiece = await PiecesService.addPiece(pieceData);
    res
      .status(201)
      .json({ message: 'Pièce ajoutée avec succès', pieceId: newPiece.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Mettre à jour une pièce existante
 */
export const updatePiece = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;
    await PiecesService.updatePiece(id, updateData);
    res.status(200).json({ message: `Pièce ${id} mise à jour avec succès.` });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer une pièce
 */
export const deletePiece = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    await PiecesService.deletePiece(id);
    res.status(200).json({ message: `Pièce ${id} supprimée avec succès.` });
  } catch (error) {
    next(error);
  }
};
