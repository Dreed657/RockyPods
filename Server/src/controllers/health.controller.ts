import express from 'express';

class HealthContoller {
    public async Health(req: express.Request, res: express.Response) {
        const data = {
            status: 'OK',
            uptime: process.uptime(),
            timestamp: Date.now(),
        };

        res.status(200).json(data);
    }
}

export default new HealthContoller();