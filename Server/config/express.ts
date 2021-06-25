import express from 'express';

import winston from 'winston';
import expressWinston from 'express-winston';

const configureExpress = (app: express.Express) => {
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());

    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            meta: false,
            msg: "HTTP {{req.method}} {{req.url}} {{res.responseTime}}ms",
        })
    );
};

export default configureExpress;
