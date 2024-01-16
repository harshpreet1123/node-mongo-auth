import User, {IUser} from '../models/users';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import generateLogToken from '../utils';
 
export const login = async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await User.findOne({ email: req.body.email });

        if (user) {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

            if (isPasswordMatch) {
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    token: generateLogToken(user),
                });
            } else {
                res.status(401).json({ message: 'Incorrect password.' });
            }
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
};
