import React from 'react';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignal } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const Header = () => {
    return (
        <header>
            <Navbar color="dark" dark>
                <Nav>
                    <NavItem>
                        <Link
                            color="white"
                            to="/"
                            className="nav-link"
                        >
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link
                            color="white"
                            to="/leaderboard"
                            className="nav-link"
                        >
                            <FontAwesomeIcon icon={faSignal} />
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </header>
    );
};

export default Header;
