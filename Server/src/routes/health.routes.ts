import { Express } from 'express';
import HealthContoller from '../controllers/health.controller';

export default (app: Express) => {
    app.get('/healthcheck', HealthContoller.Health);
};
