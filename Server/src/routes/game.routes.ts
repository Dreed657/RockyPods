import { Express } from 'express';
import GameContoller from '../controllers/game.controller';

import isAuthenticated from '../middlewares/isAuthenticated'

const Prefix = '/game';

export default (app: Express) => {
    app.post(`${Prefix}/SaveRound`, isAuthenticated, GameContoller.SaveRound);
    app.get(`${Prefix}/leaderboard`, isAuthenticated, GameContoller.GetLeaderboard);
};
