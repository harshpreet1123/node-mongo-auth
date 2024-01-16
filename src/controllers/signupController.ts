import { Request, Response } from 'express';
import User, { IUser } from '../models/users';
import bcrypt from 'bcrypt';
const cloudinary = require('cloudinary').v2;

interface FileRequest extends Request {
  files: {
    photo: any; // Adjust based on your file upload field name and type
  };
}

export const register = async (req: FileRequest, res: Response) => {
  try {
    const file = req.files?.photo;
    if (!file) {
        return res.status(400).json({ message: 'Photo is required.' });
    }

    cloudinary.uploader.upload(file.tempFilePath, async (err: any, cloudinaryResult: any) => {
      if (err) {
        console.error('Cloudinary Upload Error:', err);
        res.status(500).json({ message: 'Error uploading image to Cloudinary.' });
        return;
      }

      console.log('Cloudinary Upload Result:', cloudinaryResult);

      const user: IUser = new User({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        username: req.body.username,
        age: req.body.age,
        imgurl: cloudinaryResult.url, // Use cloudinaryResult.url here
        gender: req.body.gender,
      });

      const savedUser = await user.save();
      console.log('User Saved:', savedUser);

      res.send(savedUser);
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};
