import express from 'express';
import mongoose from 'mongoose';

class HealthContoller {
    public async Health(req: express.Request, res: express.Response) {
        const data = {
            status: 'OK',
            uptime: process.uptime(),
            timestamp: Date.now(),
            'DbState': mongoose.STATES[mongoose.connection.readyState],
        };

        res.status(200).json(data);
    }
}

export default new HealthContoller();