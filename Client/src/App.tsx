import React from 'react';

import Header from './components/Header';
import GameBody from './components/GameBody';

import './App.css';
import { useEffect } from 'react';
import HealthService from './services/HealthService';

function App() {
    useEffect(() => {
        HealthService.HealthCheck().then((res) => console.log(res.data));
    }, []);

    return (
        <div className="wrapper">
            <Header></Header>
            <GameBody></GameBody>
        </div>
    );
}

export default App;
