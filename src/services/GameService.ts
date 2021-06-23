import { HandEnum } from '../models/HandEnum';

class GameService {
    CheckWin(playerGesture: HandEnum, computerGesture: HandEnum): boolean | null {
        if (playerGesture === computerGesture) {
            return null;
        } else if (
            playerGesture === HandEnum.Paper &&
            computerGesture === HandEnum.Rock
        ) {
            return true;
        } else if (
            playerGesture === HandEnum.Rock &&
            computerGesture === HandEnum.Scissors
        ) {
            return true;
        } else if (
            playerGesture === HandEnum.Scissors &&
            computerGesture === HandEnum.Paper
        ) {
            return true;
        } else {
            return false;
        }
    }

    ComputerPlay(): any {
        let enumValues = Object.values(HandEnum) as any[];
        enumValues = enumValues.filter(x => Number.isInteger(x));
        let randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    };
}

export default new GameService();