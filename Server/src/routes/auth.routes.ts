import { Express } from 'express';
import AuthContoller from '../controllers/auth.controller';

const Prefix = '/auth';

export default (app: Express) => {
    app.get(`${Prefix}/login`, AuthContoller.Login);
    app.get(`${Prefix}/register`, AuthContoller.Register);
    app.get(`${Prefix}/getMineStats`, AuthContoller.GetMineStats);
};
