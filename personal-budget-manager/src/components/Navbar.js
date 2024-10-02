import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="ExpenseFlow Logo" className="logo-img" />
        <h1 className="logo-text">ExpenseFlow</h1> 
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tracker">My Expenses</Link>
      </div>
    </nav>
  );
}

export default Navbar;
