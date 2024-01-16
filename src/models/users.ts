import mongoose, { Document, Schema } from 'mongoose';
const validator = require('validator');
export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    age: number;
    imgurl?: string;
    gender:'male'|'female';
}

const userSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true, validate: { validator: validator.isEmail, message: "invalid email format" } },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    imgurl: { type: String },
    gender:{type:String,enum:['male','female'],required:true}
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
