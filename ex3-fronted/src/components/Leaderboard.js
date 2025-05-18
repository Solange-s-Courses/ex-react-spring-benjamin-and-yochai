import React from "react";
import Layout from "./Layout";
import { useFetch } from "../hooks/useFetch";

function Leaderboard(){
    const { data: leaderboard, isLoading, fetchError } = useFetch('/game/leaderboard');

    return (
        <Layout title={"Leader Board"}>
            {fetchError && <div className='alert alert-danger'>{fetchError}</div>}

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
                            <th scope="col">Category</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leaderboard.map((entry) => (
                            <tr key={entry.nickname}>
                                <td>{entry.nickname}</td>
                                <td>{entry.category}</td>
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