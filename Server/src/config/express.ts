import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import auth from '../middlewares/isAuth';

const configureExpress = (app: express.Express) => {
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    app.use(cors());

    app.use(morgan('dev'));

    app.use(auth());
};

export default configureExpress;
