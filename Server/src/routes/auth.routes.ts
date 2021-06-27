import { Express } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import AuthContoller from '../controllers/auth.controller';

const Prefix = '/auth';

export default (app: Express) => {
    app.post(`${Prefix}/login`, AuthContoller.Login);
    app.post(`${Prefix}/register`, AuthContoller.Register);
    app.get(`${Prefix}/getProfile`, isAuthenticated, AuthContoller.GetProfile);
};
