import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import axios from "axios";

/**
 * Component for displaying game results
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.gameState - Current game state
 * @returns {JSX.Element} The game result component
 */
function GameResult({ gameState}) {
    const navigate = useNavigate();
    /**
     * Format time as MM:SS
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time string
     */
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const [message, setMessage] = useState("Saving score");
    const [score, setScore] = useState('');

    useEffect(() => {
        const baseScore = 1000;
        const timePenalty = gameState.gameTime * 2;
        const attemptsPenalty = gameState.attempts * 10;
        const hintPenalty = gameState.showHint ? 100 : 0;
        const finalScore =  Math.max(0, baseScore - timePenalty - attemptsPenalty - hintPenalty);

       setScore(finalScore);

        const sendScore = async () => {
            try {
                await axios.post('/game/finish', {
                    nickname: gameState.playerName,
                    score: finalScore
                })
                setMessage("score saved successfully.");
            } catch (error) {
                setMessage("Error while saving game.")
            }
        }

        sendScore();

    }, [])

    return (
        <Layout title={'Congratulations! You Won!'}>
            <div className={"alert alert-info"}>{message}</div>
            <h3 className="mb-3">The word was: <span className="text-primary">{gameState.word}</span></h3>

            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h5>Game Statistics</h5>
                            <ul className="list-unstyled">
                                <li key={"score"}><strong>Your Score:</strong> {score}</li>
                                <li key={"timePlated"}><strong>Time:</strong> {formatTime(gameState.gameTime)}</li>
                                <li key={"attempts"}><strong>Attempts:</strong> {gameState.attempts}</li>
                                <li key={"showHint"}><strong>Hint Used:</strong> {gameState.showHint ? 'Yes' : 'No'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <button className="btn btn-primary me-2" onClick={()=> navigate('/leaderboard')}>
                    View Leaderboard
                </button>
                <button className="btn btn-success" onClick={()=>navigate('/')}>
                    Home Page
                </button>
            </div>
        </Layout>
    )
}

export default GameResult;