import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/*
import Leaderboard from './components/Leaderboard';
import WordManagement from './components/WordManagement';*/
import About from './components/About';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./components/HomePage";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

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
                        <Route path="/admin" element={<Layout title={"admin module"}> need to import WordManagement </Layout>} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
