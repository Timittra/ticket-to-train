/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
    <div className="header-section">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">

                    <div className="container-fluid">
                        <img className="nav-img" src={logo} alt="" />
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/">Destination</Link>
                                    
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Contact</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>

        </div>
    );
};

export default Header;