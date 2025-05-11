import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation bar component using Bootstrap
 * @component
 * @returns {JSX.Element} The navigation bar
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