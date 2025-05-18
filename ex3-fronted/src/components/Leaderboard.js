import React, {useEffect, useState} from "react";
import Layout from "./Layout";

function Leaderboard(){
    const [leaderboard, setLeaderboard] = useState([]);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('/game/leaderboard');
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }
            const data = await response.json();
            setLeaderboard(data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            setLeaderboard([]); // Set empty array on error
        }
    };

    useEffect(() => {
        fetchLeaderboard();
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