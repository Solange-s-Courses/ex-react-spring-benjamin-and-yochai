import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import WordManagement from './components/WordManagement';
import About from './components/About';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./components/HomePage";

/**
 * Main App component that sets up routing and navigation
 * @component
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<Game />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/admin" element={<WordManagement />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
