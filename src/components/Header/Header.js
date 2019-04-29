import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import logo from '../../images/cold-beer.png'

const Header = () => {
    return (
        <nav className="header">
            <Link to="/"><img className="logo" src={logo} alt=""/></Link>
            <Search />
        </nav>
    );
}

export default Header;
