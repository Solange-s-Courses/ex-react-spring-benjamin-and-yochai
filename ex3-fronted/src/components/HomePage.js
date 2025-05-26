import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import StartForm from "./StartForm";
import Layout from "./Layout";
import { useGetReq } from "../hooks/useGetReq";
import axios from 'axios';
import Spinner from "./Spinner";

/**
 * HomePage Component - The main landing page of the word guessing game
 * 
 * This component serves as the entry point to the game, displaying:
 * - Game rules and instructions
 * - A form for players to enter their nickname and select a word category
 * - Handles form validation and game initialization
 * - Manages navigation to the game page
 * 
 * @returns {Element} The rendered HomePage component with game rules and start form
 * @constructor
 */
function HomePage() {
    const navigate = useNavigate();
    const [trigger, setTrigger] = useState(null);
    const { data: categories, isLoading, fatalError, setFatalError } = useGetReq('/game/categories', trigger);
    const [formData, setFormData] = useState({nickname: "", category: ""});
    const [errors, setErrors] = useState({});
    const [firstLoad, setFirstLoad] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Validates the form data
     * 
     * This function validates the form data to ensure that the nickname and category are valid.
     * It checks that the nickname is not empty and contains only letters, and that the category is not empty.
     * 
     * @returns {boolean} True if the form data is valid, false otherwise
     */
    const validateForm = () => {
        const newErrors = {};

        if (formData.nickname.trim().length === 0) {
            newErrors.nickname = 'Please enter a nickname';
        }else if (!/^[A-Za-z0-9]+$/.test(formData.nickname.trim())){
            newErrors.nickname = 'Nickname must contain only letters';
        }

        if (!formData.category) {
            newErrors.category = 'Please choose a category';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    /**
     * Sets the first load state to false when the categories are loaded for the first time
     */
    useEffect(() => {
        setFirstLoad(false);
    }, [isLoading])

    /**
     * Starts a new game
     * 
     * This function starts a new game by sending a POST request to the server.
     * It sends the nickname and category to the server and returns the game data.
     * 
     * @param {string} nickname The nickname of the player
     * @param {string} category The category of the game
     * @returns {Promise<Object>} The game data
     */ 
    const startNewGame = async (nickname, category) => {
        const response = await axios.post('/game/start', {nickname, category});
        return response.data;
    }

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const gameData = await startNewGame(formData.nickname.trim(), formData.category);

            navigate('/game', {
                state: {
                    playerName: formData.nickname.trim(),
                    category: formData.category,
                    wordData: gameData
                }
            });

        } catch (err) {
            if(err.status === 404) {
                setErrors({...errors, general: err.message});
            } else {
                setFatalError(err.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Handles the change of the form data
     * 
     * This function handles the change of the form data when the user types in the nickname or category.
     * It updates the form data and clears the errors.
     * 
     */
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({});
    }

    return (
        <Layout title={"Word Guessing Game"}>
            <div className="card-text mb-4">
                <h3 className="text-center">Game Rules</h3>
                <ul className="text-start">
                    <li>Choose a category of words to guess from</li>
                    <li>You'll be shown a random word from that category, with letters hidden</li>
                    <li>Guess one letter at a time</li>
                    <li>Each incorrect guess adds to your penalty</li>
                    <li>Complete the word before reaching the maximum number of wrong guesses</li>
                    <li>Your score will be added to the global leaderboard</li>
                </ul>
            </div>

            {fatalError && <div className='alert alert-danger'>{fatalError}</div>}

            {firstLoad ?
                <Spinner />
                :
                <StartForm
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    disabled={!!fatalError || isSubmitting}
                    categories={categories}
                    formData={formData}
                    reload={()=>setTrigger(crypto.randomUUID())}
                />
            }
        </Layout>
    );
}

export default HomePage;

