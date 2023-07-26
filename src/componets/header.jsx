import React, { useState } from 'react';
import '../style/Header.css'; // Importe o arquivo CSS para estilização do Header

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">Logo da sua empresa</div>

      {/* Ícone de Menu Hamburger (visível somente na versão mobile) */}
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Links do Menu (visível somente na versão desktop) */}
      <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
