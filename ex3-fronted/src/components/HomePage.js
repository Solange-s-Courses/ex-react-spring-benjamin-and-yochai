import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function HomePage() {
    const [nickname, setNickname] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nicknameError, setNicknameError] = useState('');

    // Fetch categories from the REST API
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('https://your-api-endpoint.com/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
                if (data.length > 0) {
                    setSelectedCategory(data[0].id); // Set first category as default
                }
            } catch (err) {
                setError(err.message);
                // For development - use mock data if API fails
                setCategories([
                    { id: 'animals', name: 'Animals' },
                    { id: 'countries', name: 'Countries' },
                    { id: 'fruits', name: 'Fruits' },
                    { id: 'movies', name: 'Movies' }
                ]);
                setSelectedCategory('animals');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate nickname
        if (!nickname.trim()) {
            setNicknameError('Please enter a nickname');
            return;
        }

        // Check if nickname is unique (would typically be checked against a database)
        // This is a placeholder for the actual implementation
        const isUnique = true; // Replace with actual check

        if (!isUnique) {
            setNicknameError('This nickname is already taken');
            return;
        }

        // If all validations pass, start the game
        const gameConfig = {
            nickname: nickname.trim(),
            category: selectedCategory
        };

        // Here you would navigate to the game page or start the game
        console.log('Starting game with config:', gameConfig);
        alert(`Game starting! Nickname: ${gameConfig.nickname}, Category: ${gameConfig.category}`);
        // In a real app, you'd redirect or change state to show the game component
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
                                    <h3>Game Rules</h3>
                                    <ul>
                                        <li>Choose a category of words to guess from</li>
                                        <li>You'll be shown a random word from that category, with letters hidden</li>
                                        <li>Guess one letter at a time</li>
                                        <li>Each incorrect guess adds to your penalty</li>
                                        <li>Complete the word before reaching the maximum number of wrong guesses</li>
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
                                        ) : (
                                            categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        variant="success"
                                        size="lg"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        Start Game!
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