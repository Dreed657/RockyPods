import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import IRequest from '../dto/IRequest';
import IPayload from '../dto/IPayload';
import configuration from '../config';

const isAuth = () => {
    return (req: IRequest | any, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (token) {
            jwt.verify(token, configuration.SECRET, (err: any, decoded: IPayload) => {
                if (err) {
                    res.status(401).json({
                        message: err.message,
                        expiredAt: err,
                    });
                    return;
                } else {
                    req.user = { _id: decoded._id, username: decoded.username };
                    next();
                }

            });
        } else {
            next();
        }
    };
};

export default isAuth;
