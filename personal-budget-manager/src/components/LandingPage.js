import React from 'react';
import Navbar from './Navbar'; 
import './LandingPage.css';
import landingImage from '../assets/image-1.jpg';

function LandingPage() {
  return (
    <div>
      <Navbar /> 
      <div className="landing-container">
        <div className="text-section">
          <h1>ExpenseFlow</h1>
          <h2>Your personal assistant for smarter spending</h2>
          <p>
            ExpenseFlow helps you track your expenses effortlessly. Stay on top
            of your finances, categorize your spending, and make informed
            decisions for a better financial future.
          </p>
        </div>
        <div className="image-section">
          <img src={landingImage} alt="Landing Page" className="landing-image" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
