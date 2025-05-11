import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaClock, FaLightbulb, FaTimesCircle, FaTrophy, FaBook, FaTools } from 'react-icons/fa';
import Layout from "./Layout";

const About = () => {
    return (
        <Layout title="About">
            <section className="mb-5">
                <h4 className="text-primary">🎮 How to Play</h4>
                <p>
                    This is a word guessing game similar to Hangman. Try to guess a hidden word
                    by entering individual letters or guessing the entire word at once.
                </p>
                <ul className="list-unstyled ps-3">
                    <li className="mb-2">
                        <FaBook className="me-2 text-primary"/>
                        Select a category from the available options
                    </li>
                    <li className="mb-2">
                        <FaCheckCircle className="me-2 text-success"/>
                        Guess letters one by one or try to guess the whole word
                    </li>
                    <li className="mb-2">
                        <FaLightbulb className="me-2 text-warning"/>
                        Use hints when you're stuck (but they affect your score!)
                    </li>
                    <li className="mb-2">
                        <FaClock className="me-2 text-info"/>
                        Try to solve the puzzle as quickly as possible
                    </li>
                </ul>
            </section>

            <section className="mb-5">
                <h4 className="text-success">📊 Scoring System</h4>
                <p>Your score is calculated based on several factors:</p>
                <ul className="list-unstyled ps-3">
                    <li className="mb-2">
                        <FaClock className="me-2 text-info"/>
                        Time taken to solve the puzzle
                    </li>
                    <li className="mb-2">
                        <FaTimesCircle className="me-2 text-danger"/>
                        Number of incorrect guesses
                    </li>
                    <li className="mb-2">
                        <FaLightbulb className="me-2 text-warning"/>
                        Whether you used hints
                    </li>
                </ul>
                <p className="mt-3">
                    The faster you solve the puzzle with fewer mistakes and without using hints,
                    the higher your score!
                </p>
            </section>

            <section className="mb-5">
                <h4 className="text-info">✨ Features</h4>
                <ul className="list-unstyled ps-3">
                    <li className="mb-2">
                        <FaBook className="me-2 text-primary"/>
                        Multiple word categories
                    </li>
                    <li className="mb-2">
                        <FaTrophy className="me-2 text-warning"/>
                        Real-time leaderboard
                    </li>
                    <li className="mb-2">
                        <FaClock className="me-2 text-info"/>
                        Timer to track your speed
                    </li>
                    <li className="mb-2">
                        <FaLightbulb className="me-2 text-warning"/>
                        Hint system
                    </li>
                    <li className="mb-2">
                        <FaTools className="me-2 text-secondary"/>
                        Word management for administrators
                    </li>
                </ul>
            </section>

            <section className="text-center mt-5">
                <h4 className="text-secondary">👨‍💻 Contributors</h4>
                <p className="text-muted">
                    Developed as part of <strong>Internet Programming B</strong> course<br/>
                    Academic Year 2024-2025
                </p>
                <div className="d-flex justify-content-center gap-5 mt-3 ">
                    <div>
                        <strong>Yochai Benita</strong><br/>
                        <a href="mailto:Yochaiben@edu.jmc.ac.il">Yochaiben@edu.jmc.ac.il</a>
                    </div>
                    <div>
                        <strong>Benjamin Rosin</strong><br/>
                        <a href="mailto:Benjaminro@edu.jmc.ac.il">Benjaminro@edu.jmc.ac.il</a>
                    </div>
                </div>
            </section>
        </Layout>
    )
    /*
    <Container className="mt-5">
        <Row className="justify-content-center">
            <Col md={10} lg={8}>
                <Card className="shadow-lg border-0 rounded-4">
                    <Card.Header as="h3" className="text-center bg-primary text-white rounded-top-4 py-3">
                        About Word Game
                    </Card.Header>
                    <Card.Body className="bg-light rounded-bottom-4 px-4 py-4">
                        <section className="mb-5">
                            <h4 className="text-primary">🎮 How to Play</h4>
                            <p>
                                This is a word guessing game similar to Hangman. Try to guess a hidden word
                                by entering individual letters or guessing the entire word at once.
                            </p>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2">
                                    <FaBook className="me-2 text-primary" />
                                    Select a category from the available options
                                </li>
                                <li className="mb-2">
                                    <FaCheckCircle className="me-2 text-success" />
                                    Guess letters one by one or try to guess the whole word
                                </li>
                                <li className="mb-2">
                                    <FaLightbulb className="me-2 text-warning" />
                                    Use hints when you're stuck (but they affect your score!)
                                </li>
                                <li className="mb-2">
                                    <FaClock className="me-2 text-info" />
                                    Try to solve the puzzle as quickly as possible
                                </li>
                            </ul>
                        </section>

                        <section className="mb-5">
                            <h4 className="text-success">📊 Scoring System</h4>
                            <p>Your score is calculated based on several factors:</p>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2">
                                    <FaClock className="me-2 text-info" />
                                    Time taken to solve the puzzle
                                </li>
                                <li className="mb-2">
                                    <FaTimesCircle className="me-2 text-danger" />
                                    Number of incorrect guesses
                                </li>
                                <li className="mb-2">
                                    <FaLightbulb className="me-2 text-warning" />
                                    Whether you used hints
                                </li>
                            </ul>
                            <p className="mt-3">
                                The faster you solve the puzzle with fewer mistakes and without using hints,
                                the higher your score!
                            </p>
                        </section>

                        <section className="mb-5">
                            <h4 className="text-info">✨ Features</h4>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2">
                                    <FaBook className="me-2 text-primary" />
                                    Multiple word categories
                                </li>
                                <li className="mb-2">
                                    <FaTrophy className="me-2 text-warning" />
                                    Real-time leaderboard
                                </li>
                                <li className="mb-2">
                                    <FaClock className="me-2 text-info" />
                                    Timer to track your speed
                                </li>
                                <li className="mb-2">
                                    <FaLightbulb className="me-2 text-warning" />
                                    Hint system
                                </li>
                                <li className="mb-2">
                                    <FaTools className="me-2 text-secondary" />
                                    Word management for administrators
                                </li>
                            </ul>
                        </section>

                        <section className="text-center mt-5">
                            <h4 className="text-secondary">👨‍💻 Contributors</h4>
                            <p className="text-muted">
                                Developed as part of <strong>Internet Programming B</strong> course<br />
                                Academic Year 2024-2025
                            </p>
                            <div className="d-flex justify-content-center gap-5 mt-3 flex-wrap">
                                <div>
                                    <strong>Yochai Benita</strong><br />
                                    <a href="mailto:Yochaiben@edu.jmc.ac.il">Yochaiben@edu.jmc.ac.il</a>
                                </div>
                                <div>
                                    <strong>Benjamin Rosin</strong><br />
                                    <a href="mailto:Benjaminro@edu.jmc.ac.il">Benjaminro@edu.jmc.ac.il</a>
                                </div>
                            </div>
                        </section>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);*/
};

export default About;
