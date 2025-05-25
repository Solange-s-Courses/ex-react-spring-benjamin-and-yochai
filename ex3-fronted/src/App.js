import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import WordManagement from './components/WordManagement';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import HomePage from "./components/HomePage";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import ErrorPage from "./components/ErrorPage";


/**
 * App Component - Root component of the word guessing game application
 * 
 * This component serves as the main entry point that:
 * - Sets up the application routing structure
 * - Configures Bootstrap styling
 * - Manages navigation between different game sections
 * - Handles 404 errors with ErrorPage
 * - Provides consistent layout across all pages
 * 
 * Routes:
 * - /: HomePage - Game start and rules
 * - /game: Game - Main gameplay interface
 * - /leaderboard: Leaderboard - Player rankings
 * - /admin: WordManagement - Word database management
 * - /about: About - Game information and credits
 * - /*: ErrorPage - 404 not found handler
 * 
 * @component
 * @returns {JSX.Element} The main application component with routing setup
 */
function App() {
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/admin" element={<WordManagement />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
