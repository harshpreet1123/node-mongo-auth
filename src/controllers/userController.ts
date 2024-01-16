import User, { IUser } from '../models/users';
import { Request, Response, NextFunction } from 'express';

export const updateUser = async (req: any, res: Response) => {
    try {
        // User information is available in req.user (set by verifyToken middleware)
        const userId = req.user._id;

        // Check if the user exists
        const user: IUser | null = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user information
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;
        user.age = req.body.age || user.age;
        user.imgurl = req.body.imgurl || user.imgurl;
        user.gender = req.body.gender || user.gender;

        // Save the updated user data
        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during the update.' });
    }
};
