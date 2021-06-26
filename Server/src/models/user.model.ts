import mongoose, { Schema }from 'mongoose';
import bcrypt from 'bcrypt';

import IUser from '../dto/IUser'
import configuration from '../config';

const userSchema = new Schema<IUser>({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
