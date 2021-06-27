import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import User, { UserDocument } from '../models/user.model';
import Round from '../models/round.model';

import IRequest from '../dto/IRequest';

class GameContoller {
    public async SaveRound(req: IRequest | any, res: Response) {
        const { result, gesture } = req.body;

        const user: UserDocument = await User.findOne({ _id: req.user._id });

        const round = await Round.create({
            result,
            gesture,
        });

        user.rounds.push(round);
        user.save().catch(err => {
            return res.status(500).json({
                status: err.message,
                err
            })
        });

        res.status(200).json({
            a: round,
        });
    }
}

export default new GameContoller();
