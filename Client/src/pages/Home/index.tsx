import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import AuthService from '../../services/AuthService';
import tokenUtil from '../../utils/tokenUtil';

import './styles.css';

const HomePage = () => {
    const [userData, setUserdata] = useState<any>({});
    useEffect(() => {
        AuthService.getProfile().then((res) => {
            setUserdata(res.data);
            console.log(res);
        });
    }, []);

    if (!tokenUtil.getToken()) {
        return (
            <div className="box">
                <h1>
                    GO to <Link to="/login">login</Link>
                </h1>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <Header></Header>
            <div className="box">
                <h1>home</h1>
                <p>Total games: {userData.total}</p>
                <p>WinRate: {userData.playerRate}</p>
                <p>LoseRate: {userData.computerRate}</p>
                <p>DrawRate: {userData.drawRate}</p>
                <p>FailRate: {userData.failRate}</p>
                <Link to="/play" className="btn btn-primary my-1 w-100">
                    Play Vs Computer
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
