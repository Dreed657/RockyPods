import express from 'express';

import cors from 'cors';
import morgan from 'morgan';

const configureExpress = (app: express.Express) => {
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    app.use(cors());

    app.use(morgan('dev'));
};

export default configureExpress;
