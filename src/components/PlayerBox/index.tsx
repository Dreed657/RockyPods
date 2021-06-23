import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandRock,
    faHandScissors,
    faHandPaper,
    faQuestion,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { HandEnum } from '../../models/HandEnum';

import './styles.css';

interface PlayerBoxProps {
    Name: string;
    Gesture: HandEnum;
    Score: number;
    WinRate: string;
}

const PlayerBox = (props: PlayerBoxProps) => {
    const [gestureIcon, setGestureIcon] = useState<IconDefinition>(faQuestion);

    useEffect(() => {
        switch (props.Gesture) {
            case HandEnum.Paper:
                setGestureIcon(faHandPaper);
                break;
            case HandEnum.Scissors:
                setGestureIcon(faHandScissors);
                break;
            case HandEnum.Rock:
                setGestureIcon(faHandRock);
                break;
        }
    }, [props]);

    return (
        <div className="PlayerBox">
            <p className="name">{props.Name}'s Box</p>
            <p className="score">Score {props.Score}</p>
            <div className="mainGesture">
                <FontAwesomeIcon icon={gestureIcon}/>
            </div>
            <p className="winRate">WinRate {props.WinRate}%</p>
        </div>
    );
};

export default PlayerBox;
