import {Request, Response, NextFunction} from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: "Unauthorized – No access to this content!" });
    }

    next();
}