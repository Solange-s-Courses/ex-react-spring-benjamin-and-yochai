import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as gameData from "../gameData";
import StartForm from "./StartForm";
import Layout from "./Layout";
import { mockAPI } from "../gameData";

function HomePage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({nickname: "", category: ""});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch categories from the REST API
    useEffect(() => {
        console.log("homepage 16 need to fetch categories");
        const fetchCategories = async () => {
            setIsLoading(true);
            setFetchError(null);
            try {
                // Replace with your actual API endpoint
                //const response = await fetch('https://your-api-endpoint.com/categories');
                const response = {
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    json: () => Promise.reject(new Error('Not Found')),
                    text: () => Promise.resolve('Resource not found'),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                };

                if (!response.ok) {
                    throw new Error('cannot start a game at the moment, please try again');
                }
                const data = await response.json();
                setCategories(data);
                if (!data || data.length === 0) {
                    throw new Error('something went wrong, please try again later.');
                    //setFormData({...formData, category: data[0].name})

                    //setSelectedCategory(data[0].id); // Set first category as default
                }
            } catch (err) {
                //setFetchError(err.message);
                // For development - use mock data if API fails
                setCategories(gameData.WORD_CATEGORIES);
                //setFormData({...formData, [`category`]:'animals'});
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const validateForm = () => {
        const isUnique = true;
        const newErrors = {};

        if (formData.nickname.trim().length === 0) {
            newErrors.nickname = 'Please enter a nickname';
        } else if (!isUnique) {// need to move to submition
            newErrors.nickname = 'This nickname is already taken';
        }

        if (!formData.category) {
            newErrors.category = 'Please choose a category';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    // Check if nickname already exists
    const startNewGame = async (nickname, category) => {
        const response = await fetch('/api/game/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname: nickname.trim(), category })
        });

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(data.message || 'Cannot start game');
            error.status = response.status;
            throw error;
        }

        return data;
    };


    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try{
            //const gameData  = await startNewGame(formData.nickname, formData.category);
            const gameData = await mockAPI.getRandomWord(formData.category);
            console.log("gameData returned from API:", gameData);

            navigate('/game', {
                state: {
                    playerName: formData.nickname.trim(),
                    category: formData.category,
                    wordData: gameData
                }
            });

        } catch (err){
            if(err.status === 404 || err.status === 409) {
                setErrors(err.message);
            }
            else{
                setFetchError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
        // send nick and cat to server
        // 200 - set local stor. and navigate to /game
        // 403 - nickname already taken. stErrors({...errors, [nickname]: "name already taken"})
        // * - setFetchError(e.message);

        // If all validations pass, start the game
        const gameConfig = {
            nickname: formData.nickname.trim().toLowerCase(),
            category: formData.category,
        };

        // Here you would navigate to the game page or start the gam
        console.log('Starting game with config:', gameConfig);
        // In a real app, you'd redirect or change state to show the game component

        /*navigate('/game', {
            state: {
                playerName: gameConfig.nickname,
                category: gameConfig.category
            },
        });*/
    };

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

            {fetchError && <div className='alert alert-danger'>{fetchError}</div>}

            {isLoading ?
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"/>
                </div>
                :
                <StartForm
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    disabled={!!fetchError}
                    categories={categories}
                    formData={formData}
                />
            }
        </Layout>
    );
}

export default HomePage;
