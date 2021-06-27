import mongoose, { Schema } from 'mongoose';

export interface RoundInput {
    result: string;
    gesture: string;
    userId: string;
}

export interface RoundDocument extends RoundInput, Document {}

const roundSchema = new Schema(
    {
        id: mongoose.Types.ObjectId,
        result: {
            type: String,
            enum: ['Draw', 'Player', 'Computer', 'Fail'],
            required: true,
        },
        gesture: {
            type: String,
            enum: ['Rock', 'Paper', 'Scissors'],
            required: true,
        },
        userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<RoundDocument>('Round', roundSchema);
