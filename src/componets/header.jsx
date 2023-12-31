import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; 
import '../style/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();


  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="logo">Logo</div>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li className={isRouteActive("/") ? "active" : ""}><NavLink className='mx-1' to="/">Home</NavLink></li>
          <li className={isRouteActive("/register") ? "active" : ""}><NavLink className='mx-1' to="/register">Register</NavLink></li>
          <li className={isRouteActive("/list") ? "active" : ""}><NavLink className='mx-1'  to="/list">List</NavLink></li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
