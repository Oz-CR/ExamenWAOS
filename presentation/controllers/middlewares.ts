import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY as string;

interface AuthRequest extends Request {
    user?: {id: number, role: string};
};

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    } else {
        try {
            const decoded = jwt.verify(token, secret) as {id: number, role:  string};
            req.user = decoded;
            console.log(req.user);
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
    }
}

export const authorizeOnlyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'Admin') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    } else {
        next();
    }
}

export const authorizeClientAndAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'Admin' && req.user?.role !== 'Client') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    } else {
        next();
    }
}