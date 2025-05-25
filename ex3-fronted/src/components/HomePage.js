import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import StartForm from "./StartForm";
import Layout from "./Layout";
import { useGetReq } from "../hooks/useGetReq";
import axios from 'axios';
import Spinner from "./Spinner";

function HomePage() {
    const navigate = useNavigate();
    const { data: categories, isLoading, fatalError, setFatalError } = useGetReq('/game/categories');
    const [formData, setFormData] = useState({nickname: "", category: ""});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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


    const startNewGame = async (nickname, category) => {
        //try{
            const response = await axios.post('/game/start', {nickname, category});
            return response.data;
        //} catch (error) {

        //}

        /*const response = await fetch('/game/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname: nickname.trim(), category })
        });


        if (!response.ok) {
            // need to add messages in backend-----------------------------------------------------
            const error = new Error(/*data.message ||* / 'Cannot start game');
            error.status = response.status;
            throw error;
        }
        const data = await response.json();

        return data;*/
    };

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
            if(err.status === 404 || err.status === 409) {
                setErrors({...errors, general: err.message});
            } else {
                setFatalError(err.message);
            }
        } finally {
            setIsSubmitting(false);
        }
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

            {fatalError && <div className='alert alert-danger'>{fatalError}</div>}

            {isLoading ?
                <Spinner />
                :
                <StartForm
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    disabled={!!fatalError || isSubmitting}
                    categories={categories}
                    formData={formData}
                />
            }
        </Layout>
    );
}

export default HomePage;
