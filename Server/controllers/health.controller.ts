import express from 'express';

class HealthContoller {
    async Health(req: express.Request, res: express.Response) {
        const data = {
            uptime: process.uptime(),
            status: 'OK',
            timestamp: Date.now(),
        };

        res.status(200).send(data);
    }
}

export default new HealthContoller();
