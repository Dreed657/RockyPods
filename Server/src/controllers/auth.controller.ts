import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import configuration from '../config';

import User from '../models/user.model';
import IUser from '../dto/IUser';

class AuthContoller {
    public async Login(req: Request, res: Response) {
        const { username, password } = req.body;
        const invalidCredentialsResponse = {
            status: '401 Unauthorized',
            message: 'Invalid credentials',
        };

        // TODO: Add right type
        const user: any = await User.findOne({ username });
        if (!user) {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            configuration.SECRET,
            {
                expiresIn: 30,
            }
        );

        return res.status(200).json({
            token,
            user: {
                username: user.username,
            },
        });
    }

    public async Register(req: Request, res: Response) {
        const { username, password } = req.body;

        User.findOne({ username }).then((user) => {
            if (user) {
                return res.status(403).json({
                    status: '401 Forbidden!',
                    message: 'This user already exists!',
                });
            }
        });

        bcrypt
            .genSalt(configuration.SALT_ROUNDS)
            .then((salt) => {
                return bcrypt.hashSync(password, salt);
            })
            .then((hash) => {
                // TODO: Add right type
                const user: any = new User();

                user.username = username;
                user.password = hash;

                user.save()
                    .then((data: IUser) => {
                        return res
                            .status(200)
                            .json({ Username: data.username });
                    })
                    .catch((err: Error) => {
                        return res.status(500).json({
                            message: 'Something when south!',
                            err,
                        });
                    });
            })
            .catch((err) => {
                // tslint:disable-next-line: no-console
                console.error(err);
            });
    }

    public async GetMineStats(req: Request, res: Response) {
        res.status(200).json('GetMineStats');
    }
}

export default new AuthContoller();
