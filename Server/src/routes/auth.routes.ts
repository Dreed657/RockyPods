import { Express } from 'express';
import AuthContoller from '../controllers/auth.controller';

const authPrefix = '/auth';

export default (app: Express) => {
    app.get(`${authPrefix}/login`, AuthContoller.Login);
    app.get(`${authPrefix}/register`, AuthContoller.Register);
    app.get(`${authPrefix}/getMineStats`, AuthContoller.GetMineStats);
};
