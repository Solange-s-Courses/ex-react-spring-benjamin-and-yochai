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
 * Main App component that sets up routing and navigation
 * @component
 * @returns {JSX.Element} The main application component
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
