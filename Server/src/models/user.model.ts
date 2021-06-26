import mongoose, { Document, HookNextFunction, Schema } from 'mongoose';

import bcrypt from 'bcrypt';

import Round, { RoundDocument } from './round.model'
import configuration from '../config';

export interface UserInput {
    username: string;
    password: string;
}

export interface UserDocument extends UserInput, Document {
    rounds: RoundDocument[]
}

const userSchema = new Schema(
    {
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
        rounds: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Round',
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre(
    'save',
    async function (this: UserDocument, next: HookNextFunction) {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(configuration.SALT_ROUNDS);

        const hash = await bcrypt.hashSync(this.password, salt);

        this.password = hash;

        return next();
    }
);

export default mongoose.model<UserDocument>('User', userSchema);
