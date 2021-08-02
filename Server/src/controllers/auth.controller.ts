import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import configuration from '../config';

import User, { UserDocument, UserInput } from '../models/user.model';
import Round from '../models/round.model';
import IPayload from '../dto/IPayload';
import IRequest from '../dto/IRequest';

class AuthContoller {
    public async Login(req: Request, res: Response) {
        const { username, password } = req.body;
        const invalidCredentialsResponse = {
            status: '401 Unauthorized',
            message: 'Invalid credentials',
        };

        // TODO: Add right type
        const user: UserDocument = await User.findOne({ username });
        if (!user) {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const payload: IPayload = {
            _id: user._id,
            username: user.username,
        };

        const token = jwt.sign(payload, configuration.SECRET, {
            // Token is valid for next 7 days
            expiresIn: 60 * 60 * 24 * 7,
        });

        res.status(200).json({
            token,
            user: {
                username: user.username,
            },
        });
    }

    public async Register(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = User.create<UserInput>({ username, password })
            .then((data) => {
                res.status(200).json({ username: data.username });
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message,
                    err,
                });
            });
    }

    public async GetProfile(req: IRequest | any, res: Response) {
        try {
            const rawStats: any[] = await Round.aggregate([
                {
                    $match: {
                        userId: mongoose.Types.ObjectId(req.user._id),
                    },
                },
                { $group: { _id: '$result', count: { $sum: 1 } } },
                {
                    $group: {
                        _id: null,
                        ComputerCount: {
                            $max: {
                                $cond: [
                                    { $eq: ['$_id', 'Computer'] },
                                    '$count',
                                    0,
                                ],
                            },
                        },
                        PlayerCount: {
                            $max: {
                                $cond: [
                                    { $eq: ['$_id', 'Player'] },
                                    '$count',
                                    0,
                                ],
                            },
                        },
                        DrawCount: {
                            $max: {
                                $cond: [{ $eq: ['$_id', 'Draw'] }, '$count', 0],
                            },
                        },
                        FailCount: {
                            $max: {
                                $cond: [{ $eq: ['$_id', 'Fail'] }, '$count', 0],
                            },
                        },
                    },
                },
            ]);

            const total = await Round.count({ userId: req.user._id });

            const precision = 2;
            const stats = rawStats[0];
            const computerRate = Math.round((stats.ComputerCount / total) * 100).toFixed(precision);
            const playerRate = Math.round((stats.PlayerCount / total) * 100).toFixed(precision);
            const drawRate = Math.round((stats.DrawCount / total) * 100).toFixed(precision);
            const failRate = Math.round((stats.FailCount / total) * 100).toFixed(precision);

            return res.status(200).json({
                stats,
                computerRate,
                playerRate,
                drawRate,
                failRate,
                total,
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new AuthContoller();
