import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Layout Component - Main application layout wrapper
 * 
 * This component provides the main application structure that:
 * - Includes a responsive navigation bar
 * - Wraps content in a consistent card layout
 * - Provides navigation links to all main sections
 * - Maintains consistent styling across pages
 * - Handles responsive design for all screen sizes
 * - Includes a footer with game message
 * 
 * @returns {Element} The rendered Layout component with navigation and content wrapper
 * @constructor
 * @param {Object} props - Component props
 * @param {string|Element} props.title - Page title to display
 * @param {Element} props.children - Child components to render
 */
const Layout = ({title, children}) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">WordPulse</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/game">Game</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Manage Words</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white text-center">
                                <h2>{title}</h2>
                            </div>
                            <div className="card-body align-content-start">
                                {children}
                            </div>
                            <div className="card-footer text-center text-muted">
                                Challenge your friends and top the leaderboard!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;