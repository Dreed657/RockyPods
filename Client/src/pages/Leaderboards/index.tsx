import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Header from '../../components/Header';
import { LeaderboardDto } from '../../models/LeaderBoardDto';
import GameService from '../../services/GameService';

const LeaderboardPage = () => {

    const [stats, setStats] = useState<LeaderboardDto[]>();

    useEffect(() => {
        GameService.GetLeaderBoards().then(res => {
            console.log(res);
            setStats(res.data);
        });
    }, []);

    return (
        <div className="wrapper w-50">
            <Header></Header>
            <h1>Leaderboard Page.</h1>
           
            { !stats ? (
                <p>Loading...</p>
            ) : (
            <table className="table table-striped" style={{color: 'white'}}>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Rounds</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((e, i) => {
                        return (
                            <tr key={e._id}>
                                <th scope="row">{i}</th>
                                <td>{e.username}</td>
                                <td>{e.rounds.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default LeaderboardPage;
