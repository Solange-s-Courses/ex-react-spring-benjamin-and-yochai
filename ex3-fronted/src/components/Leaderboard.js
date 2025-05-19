import React from "react";
import Layout from "./Layout";
import { useFetch } from "../hooks/useFetch";

function Leaderboard(){
    const { data: leaderboard, isLoading, fatalError } = useFetch('/game/leaderboard');

    return (
        <Layout title={"Leader Board"}>
            {fatalError && <div className='alert alert-danger'>{fatalError}</div>}

            {isLoading ?
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"/>
                </div>
                :
                leaderboard.length > 0 ?
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Nick</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboard
                            .sort((a, b) => b.score - a.score)
                            .map((entry) => (
                            <tr key={entry.nickname}>
                                <td>{entry.nickname}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    :
                    <div className="alert alert-danger">
                        Unfortunately, the leaderboard cannot be displayed at this time.
                        Please try again later.
                    </div>
            }
        </Layout>
    );
}

export default Leaderboard;