import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HealthService from './services/HealthService';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorPage from './pages/Error';
import LeaderboardPage from './pages/Leaderboards';
import GamePage from './pages/Game';

import './App.css';

function App() {
    useEffect(() => {
        HealthService.HealthCheck().then((res) => console.log(res));
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage}></Route>
                <Route path="/play" exact component={GamePage}></Route>
                <Route path="/leaderboard" exact component={LeaderboardPage}></Route>
                <Route path="/login" exact component={LoginPage}></Route>
                <Route path="/register" exact component={RegisterPage}></Route>

                <Route component={ErrorPage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
