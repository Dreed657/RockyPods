import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import configuration from '../config';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        jwt.verify(token, configuration.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: err.message,
                    expiredAt: err.name,
                });
            }

            // req.user = decoded;
            next();
        });
    } else {
        next();
    }
};
