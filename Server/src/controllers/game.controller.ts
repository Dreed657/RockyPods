import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import User, { UserDocument } from '../models/user.model';
import Round from '../models/round.model';

import IRequest from '../dto/IRequest';

class GameContoller {
    public async SaveRound(req: IRequest | any, res: Response) {
        const { result, gesture } = req.body;

        const user: UserDocument = await User.findOne({ _id: req.user._id });

        await Round.create({
            result,
            gesture,
            userId: req.user._id,
        })
            .then((r) => {
                user.rounds.push(r);
                user.save(() => {
                    return res.status(201).json({
                        r,
                    });
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: err.message,
                    err,
                });
            });
    }

    public async GetLeaderboard(req: Request, res: Response) {
        const top10 = await User.find({})
            .limit(10)
            .sort({ rounds: -1 })
            .select({ username: 1, rounds: 1})

        return res.status(200).json(top10);
    }
}

export default new GameContoller();
