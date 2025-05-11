/*
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function HomePage() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({nickname:"", category:""});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch categories from the REST API
    useEffect(() => {
        console.log("homepage 16 need to fetch categories");
        const fetchCategories = async () => {
            setIsLoading(true);
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
                if (data.length > 0) {
                    setFormData({...formData, category: data[0].name})
                    //setSelectedCategory(data[0].id); // Set first category as default
                }
            } catch (err) {
                //setFetchError(err.message);
                // For development - use mock data if API fails
                setCategories([
                    { id: 'animals', name: 'Animals' },
                    { id: 'countries', name: 'Countries' },
                    { id: 'fruits', name: 'Fruits' },
                    { id: 'movies', name: 'Movies' }
                ]);
                setFormData({...formData, [`category`]:'animals'});
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const isUnique = true;
        const newErrors = {};

        if (formData.nickname.trim().length === 0) {
            newErrors.nickname = 'Please enter a nickname';
            //setErrors({...errors, ['nickname']:'Please enter a nickname'});
        }
        else if (!isUnique) {
            newErrors.nickname = 'This nickname is already taken';
            //setErrors({...errors, ['nickname']:'This nickname is already taken'});
        }

        if (!formData.category) {
            newErrors.category = 'Please choose a category';
            setErrors({...errors, ['category']:'Please choose a category'});
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0){
            return;
        }

        // If all validations pass, start the game
        const gameConfig = {
            nickname: formData.nickname.trim().toLowerCase(),
            category: formData.category.trim().toLowerCase(),
        };

        // Here you would navigate to the game page or start the gam
        console.log('Starting game with config:', gameConfig);
        alert(`Game starting! Nickname: ${gameConfig.nickname}, Category: ${gameConfig.category}`);
        // In a real app, you'd redirect or change state to show the game component
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({});

    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h1>Word Guessing Game</h1>
                        </div>
                        <div className="card-body align-content-start">
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

                            {fetchError && <Alert variant="danger">{fetchError}</Alert>}

                            {isLoading ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status"/>
                                </div>
                                :
                                <form onSubmit={handleSubmit} className="text-start">
                                    <div className="mb-3">
                                        <label htmlFor="nickname" className="form-label">Nickname (must be
                                            unique)</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nickname? "is-invalid" : ""}`}
                                            id="nickname"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            placeholder="Enter your nickname"
                                            disabled={fetchError}

                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nickname}
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="category" className="form-label">Choose a Word Category</label>
                                        <select
                                            className={`form-control ${errors.category? "invalid": ""}`}
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            disabled={fetchError}
                                        >
                                            {categories.map(category => (
                                                    <option key={category.name} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="d-grid">
                                        <Button
                                            variant="success"
                                            size="lg"
                                            type="submit"
                                            disabled={fetchError}
                                        >
                                            Start Game!
                                        </Button>
                                    </div>
                                </form>
                            }


                        </div>
                        <div className="card-footer text-center text-muted">
                        Challenge your friends and top the leaderboard!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import {mockAPI} from "../gameData";

/**
 * HomePage component for starting the game
 * @component
 * @returns {JSX.Element} The home page component
 */
function HomePage() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nicknameError, setNicknameError] = useState('');

    // Fetch categories from the mock API
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await mockAPI.getCategories();
                setCategories(data);
                if (data.length > 0) {
                    setSelectedCategory(data[0]); // Set first category as default
                }
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch categories:', err);
                // Fallback to empty categories
                setCategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    /**
     * Validate nickname against existing leaderboard
     * @returns {boolean} Whether nickname is valid and unique
     */
    const validateNickname = async () => {
        if (!nickname.trim()) {
            setNicknameError('Please enter a nickname');
            return false;
        }

        try {
            // Check if nickname already exists in leaderboard
            const leaderboard = await mockAPI.getLeaderboard();
            const existingNicknames = leaderboard.map(entry => entry.playerName.toLowerCase());

            if (existingNicknames.includes(nickname.toLowerCase())) {
                setNicknameError('This nickname is already taken');
                return false;
            }
        } catch (err) {
            console.error('Error checking nickname uniqueness:', err);
            // Continue anyway if leaderboard check fails
        }

        return true;
    };

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setError(null);
        setNicknameError('');

        // Validate nickname
        const isValid = await validateNickname();

        if (!isValid) {
            return;
        }

        // Check if category is selected
        if (!selectedCategory) {
            setError('Please select a category');
            return;
        }

        // Start the game with selected configuration
        navigate('/game', {
            state: {
                playerName: nickname.trim(),
                category: selectedCategory
            }
        });
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white text-center">
                            <h1>Word Guessing Game</h1>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-4">
                                <Col>
                                    <h3>How to Play</h3>
                                    <ul>
                                        <li>Enter your unique nickname</li>
                                        <li>Choose a category of words to guess from</li>
                                        <li>You'll be shown a random word with letters hidden</li>
                                        <li>Guess one letter at a time or the entire word</li>
                                        <li>Use hints when needed (affects your final score)</li>
                                        <li>Try to complete the word with minimum attempts</li>
                                        <li>Your score will be added to the global leaderboard</li>
                                    </ul>
                                </Col>
                            </Row>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nickname (must be unique on the leaderboard)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => {
                                            setNickname(e.target.value);
                                            setNicknameError(''); // Clear error when user types
                                        }}
                                        isInvalid={!!nicknameError}
                                        placeholder="Enter your nickname"
                                        disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {nicknameError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Choose a Word Category</Form.Label>
                                    <Form.Select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <option>Loading categories...</option>
                                        ) : categories.length === 0 ? (
                                            <option>No categories available</option>
                                        ) : (
                                            <>
                                                <option value="">-- Select a category --</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        variant="success"
                                        size="lg"
                                        type="submit"
                                        disabled={isLoading || categories.length === 0}
                                    >
                                        {isLoading ? 'Loading...' : 'Start Game!'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center text-muted">
                            Challenge your friends and top the leaderboard!
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;