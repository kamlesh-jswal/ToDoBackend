import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Received token:", token);

    try {
        const payload = jwt.verify(token, config.jwtSecret) as { userId: string };
        (req as AuthenticatedRequest).userId = payload.userId;
        next();
    } catch (error) {
        console.error('JWT verify error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};