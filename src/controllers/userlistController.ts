import User,{IUser} from '../models/users';
import { Request,Response } from 'express';

export const userList = async (req: any, res: Response) => {
    try {
        // User information is available in req.user (set by verifyToken middleware)
        const userId = req.user._id;

        // Fetch the list of usernames from the database (modify as per your schema)
        const usernames: string[] = await User.find({}).distinct('username');

        res.json({ userId, usernames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching usernames.' });
    }
};