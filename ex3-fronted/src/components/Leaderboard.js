import React from "react";
import Layout from "./Layout";
import { useGetReq } from "../hooks/useGetReq";
import Spinner from "./Spinner";

function Leaderboard(){
    const { data: leaderboard, isLoading, fatalError } = useGetReq('/game/leaderboard');

    return (
        <Layout title={"Leader Board"}>
            {fatalError ?
                <div className='alert alert-danger'>{fatalError}</div>
                :
                isLoading ?
                    <Spinner />
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