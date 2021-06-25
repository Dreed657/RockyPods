import express from 'express';
import HealthContoller from '../controllers/health.controller'

const healthRoutes = (app: express.Express) => {
    app.get('/healthcheck', HealthContoller.Health)
}

export default healthRoutes;