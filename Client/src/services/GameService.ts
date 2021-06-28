import { AxiosResponse } from 'axios';
import { HandEnum } from '../models/HandEnum';
import { ResultEnum } from '../models/ResultEnum';

import axiosInstance from '../utils/axiosUtil';

const API_URL = 'http://localhost:5000';

interface IRound {
    gesture: string,
    result: string
}

class GameService {
    CheckWin(playerGesture: HandEnum, computerGesture: HandEnum): ResultEnum {
        if (playerGesture === computerGesture) {
            return ResultEnum.Draw;
        } else if (
            computerGesture === HandEnum.Paper &&
            playerGesture === HandEnum.Rock
        ) {
            return ResultEnum.Computer;
        } else if (
            computerGesture === HandEnum.Scissors &&
            playerGesture === HandEnum.Paper
        ) {
            return ResultEnum.Computer;
        } else if (
            computerGesture === HandEnum.Rock &&
            playerGesture === HandEnum.Scissors
        ) {
            return ResultEnum.Computer;
        } else if (
            playerGesture === HandEnum.Paper &&
            computerGesture === HandEnum.Rock
        ) {
            return ResultEnum.Player;
        } else if (
            playerGesture === HandEnum.Scissors &&
            computerGesture === HandEnum.Paper
        ) {
            return ResultEnum.Player;
        } else if (
            playerGesture === HandEnum.Rock &&
            computerGesture === HandEnum.Scissors
        ) {
            return ResultEnum.Player;
        }

        // This won't ever be hit
        return ResultEnum.Fail;
    }

    ComputerPlay(): any {
        // Gets values of HandEnum
        let enumValues = Object.values(HandEnum) as any[];

        // Filters only values
        enumValues = enumValues.filter((x) => Number.isInteger(x));

        // Select random hand gesture from the array
        let randomIndex = Math.floor(Math.random() * enumValues.length);
        
        return enumValues[randomIndex];
    }

    SaveRound(data: IRound): Promise<AxiosResponse> {
        return axiosInstance.post(`${API_URL}/game/saveround`, data);
    }
}

export default new GameService();
