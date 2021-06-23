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

const GameBody = () => {
    const [roundsCount, setRoundsCount] = useState<number>(0);
    
    const [playerGesture, setPlayerGesture] = useState<HandEnum>(0);
    const [computerGesture, setComputerGesture] = useState<HandEnum>(0);

    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);

    const [playerWinRate, setPlayerWinRate] = useState<string>('');
    const [computerWinRate, setComputerWinRate] = useState<string>('');

    const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false);

    const onPlayerAction = (playerInput: HandEnum) => {
        setPlayerGesture(playerInput);

        let computerInput = GameService.ComputerPlay();
        setComputerGesture(computerInput);

        let roundResult = GameService.CheckWin(playerGesture, computerGesture);

        if (roundResult) {
            setPlayerScore(playerScore + 1);
        } else {
            setComputerScore(computerScore + 1);
        }

        setPlayerWinRate(((playerScore / computerScore) * 100).toPrecision(4));
        setComputerWinRate(
            ((computerScore / playerScore) * 100).toPrecision(4)
        );

        setRoundsCount(roundsCount + 1);
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
           
            <PlayerBox
                Name={'Player'}
                Gesture={playerGesture}
                Score={playerScore}
                WinRate={playerWinRate}
            ></PlayerBox>

            <div className="playerActions">
                <p>Rounds: {roundsCount}</p>
                <Button
                    onClick={() => onPlayerAction(HandEnum.Rock)}
                    color="secondary"
                >
                    <FontAwesomeIcon icon={faHandRock} />
                </Button>
                <Button
                    onClick={() => onPlayerAction(HandEnum.Paper)}
                    color="secondary"
                >
                    <FontAwesomeIcon icon={faHandPaper} />
                </Button>
                <Button
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
