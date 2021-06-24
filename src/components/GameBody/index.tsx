import React, { useState } from 'react';

import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandRock,
    faHandScissors,
    faHandPaper,
    faWrench,
} from '@fortawesome/free-solid-svg-icons';

import PlayerBox from '../PlayerBox';

import { HandEnum } from '../../models/HandEnum';
import GameService from '../../services/GameService';

import './styles.css';
import TitleUtil from '../../utils/TitleUtil';
import { ResultEnum } from '../../models/ResultEnum';

const GameBody = () => {
    const [roundsCount, setRoundsCount] = useState<number>(0);

    const [playerGesture, setPlayerGesture] = useState<HandEnum>(0);
    const [computerGesture, setComputerGesture] = useState<HandEnum>(0);

    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);
    const [drawScore, setDrawScore] = useState<number>(0);

    const [roundResult, setRoundResult] = useState<ResultEnum>(ResultEnum.Fail);

    const [playerWinRate, setPlayerWinRate] = useState<number>(0);
    const [computerWinRate, setComputerWinRate] = useState<number>(0);

    const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false);

    const onPlayerAction = (playerInput: HandEnum) => {
        setPlayerGesture(playerInput);

        let computerInput = GameService.ComputerPlay();
        setComputerGesture(computerInput);

        setRoundResult(GameService.CheckWin(playerGesture, computerGesture));

        if (roundResult === ResultEnum.Player) {
            setPlayerScore(playerScore + 1);
        } else if (roundResult === ResultEnum.Computer) {
            setComputerScore(computerScore + 1);
        } else {
            setDrawScore(drawScore + 1);
        }

        switch (roundResult) {
            case ResultEnum.Player:
                setPlayerScore(playerScore + 1);
                break;
            case ResultEnum.Computer:
                setComputerScore(computerScore + 1);
                break;
            case ResultEnum.Draw:
                setDrawScore(drawScore + 1);
                break;
            default:
                console.log('Something went south!');
                break;
        }

        // [Dispute Wins / (Dispute Wins + Dispute Losses)] * 100 = Win Rate
        let playerWinRate = Math.round(
            (playerScore / (computerScore + (roundsCount - playerScore))) * 100
        );
        let computerWinRate = Math.round(
            (computerScore / (computerScore + (roundsCount - computerScore))) *
                100
        );
        setPlayerWinRate(playerWinRate);
        setComputerWinRate(computerWinRate);

        setRoundsCount(roundsCount + 1);

        // Set page title
        TitleUtil.ChangeStatus(ResultEnum[roundResult]);

        if (showDebugInfo) {
            console.log('Gesture: ', HandEnum[playerInput]);
            console.log(`Input: P ${playerGesture} C ${computerGesture}`);
            console.log(
                `Player: ${HandEnum[playerGesture]} vs Computer: ${
                    HandEnum[computerGesture]
                }: Winner ${roundResult ? 'Player' : 'Computer'}`
            );
        }
    };

    return (
        <div className="GameBox">
            <PlayerBox
                Name={'Computer'}
                Gesture={computerGesture}
                Score={computerScore}
                WinRate={computerWinRate}
            ></PlayerBox>
            <hr />
            <p className="resultDisplay">Winner: {ResultEnum[roundResult]}</p>
            <hr />
            <PlayerBox
                Name={'Player'}
                Gesture={playerGesture}
                Score={playerScore}
                WinRate={playerWinRate}
            ></PlayerBox>
            <div className="playerActions">
                <p className="roundCounter">Rounds: {roundsCount}</p>
                <Button
                    className="playerActionButton"
                    onClick={() => onPlayerAction(HandEnum.Rock)}
                    color="secondary"
                >
                    <FontAwesomeIcon icon={faHandRock} />
                </Button>
                <Button
                    className="playerActionButton"
                    onClick={() => onPlayerAction(HandEnum.Paper)}
                    color="secondary"
                >
                    <FontAwesomeIcon icon={faHandPaper} />
                </Button>
                <Button
                    className="playerActionButton"
                    onClick={() => onPlayerAction(HandEnum.Scissors)}
                    color="secondary"
                >
                    <FontAwesomeIcon icon={faHandScissors} />
                </Button>
                <Button
                    onClick={() => setShowDebugInfo(!showDebugInfo)}
                    color="secondary"
                    style={{ padding: 5, fontSize: 15 }}
                    title="Toggles console debug info..."
                >
                    <FontAwesomeIcon icon={faWrench} />
                </Button>
            </div>
        </div>
    );
};

export default GameBody;
