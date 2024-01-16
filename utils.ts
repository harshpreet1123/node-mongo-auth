import jwt from 'jsonwebtoken';
import { IUser } from './models/users';
import { Request, Response, NextFunction } from 'express';

const generateLogToken = (user:IUser): string => {
    return jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.JWT_PASS || '899023',
        {
            expiresIn: '10d',
        }
    );
};

export const verifyToken = (req: any, res: any, next: NextFunction): void => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    jwt.verify(token, process.env.JWT_PASS || '899023', (err: any, decoded: any) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
        }

        req.user = decoded; // Set user information in the request object
        next();
    });
};

export default generateLogToken;
