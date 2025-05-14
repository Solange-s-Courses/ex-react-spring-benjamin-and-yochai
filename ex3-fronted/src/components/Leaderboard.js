import React, {useEffect, useState} from "react";
import Layout from "./Layout";

function Leaderboard(){
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        setLeaderboard([
            {nickname: "aaa", category: "aaa", score: 1},
            {nickname: "bbb", category: "bbb", score: 0},
            {nickname: "ccc", category: "ccc", score: 5},
            {nickname: "ddd", category: "ddd", score: 0}]);
    }, []);
    return (

            <Layout title={"Leader Board"}>
                {leaderboard.length > 0 ?
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
                        ))
                        }
                        </tbody>
                    </table>
                    :
                    <div className="alert alert-danger">Unfortunately, the leaderboard cannot be displayed
                        at this time.
                        Please try again later.
                    </div>
                }
            </Layout>
        )
}
export default Leaderboard;