import express from 'express';

class AuthContoller {
    public async Login(req: express.Request, res: express.Response) {}

    public async Register(req: express.Request, res: express.Response) {}

    public async GetMineStats(req: express.Request, res: express.Response) {}
}

export default new AuthContoller();
