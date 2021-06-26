import express from 'express';

class AuthContoller {
    public async Login(req: express.Request, res: express.Response) {
        res.status(200).json("Login");
    }

    public async Register(req: express.Request, res: express.Response) {
        res.status(200).json("Register");
    }

    public async GetMineStats(req: express.Request, res: express.Response) {
        res.status(200).json("GetMineStats");
    }
}

export default new AuthContoller();
