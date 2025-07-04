import React, { useState } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
<div className="logo" id="bttn">
  <Link to="/"><img src='https://png.pngtree.com/png-vector/20220617/ourmid/pngtree-sk-letter-logo-vector-design-template-png-image_5120405.png'></img></Link>
</div>      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
      
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>


      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
