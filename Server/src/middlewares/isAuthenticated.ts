import {Request, Response, NextFunction} from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: "Unauthorized – No access to this content!" });
    }

    next();
}