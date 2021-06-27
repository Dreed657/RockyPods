import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import configuration from '../config';

import User, { UserDocument, UserInput } from '../models/user.model';
import IPayload from '../dto/IPayload';

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
            // Token is valid for next 30 min
            expiresIn: 30 * 60,
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

    public async GetMineStats(req: Request, res: Response) {
        res.status(200).json('GetMineStats');
    }
}

export default new AuthContoller();
