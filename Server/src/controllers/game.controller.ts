import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import User, { UserDocument } from '../models/user.model';
import Round from '../models/round.model';

import IRequest from '../dto/IRequest';
import { SummeryDto } from '../dto/SummeryDto';
import e from 'express';

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

    public async Leaderboard(req: Request, res: Response) {
        const top10 = await User.find().sort({ rounds: -1 }).limit(5);

        return res.status(200).json(top10);
    }

    public async Summery(req: Request, res: Response) {
        const totalRounds = await Round.count();
        const totalUsers = await User.count();

        const top10Rounds = await User.find().sort({ rounds: -1 }).limit(5);

        const dayInterval = new Date();
        dayInterval.setDate(dayInterval.getDate() - 7);

        const roundsWeekly = await Round.aggregate([
            { $match: { createdAt: { $gte: dayInterval } } },
            {
                $project: {
                    _id: { $toDate: { $toLong: '$createdAt' } },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$_id' },
                    },
                    rounds: { $sum: 1 },
                },
            },
            { $project: { _id: 0, date: '$_id', rounds: 1 } },
            { $sort: { date: -1 } },
        ]);

        const data: SummeryDto = {
            totalRounds,
            totalUsers,
            playersTop5Rounds: top10Rounds.map((entity) => ({
                _id: entity._id,
                username: entity.username,
                rounds: entity.rounds.length,
            })),
            playersTop5WinRate: [],
            roundsWeekly,
        };

        return res.status(200).json(data);
    }
}

export default new GameContoller();
