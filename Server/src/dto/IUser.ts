import mongoose from 'mongoose';

export default interface IUser {
    id: mongoose.Types.ObjectId;
    username: string;
    password: string;
}
