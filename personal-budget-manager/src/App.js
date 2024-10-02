import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';  // Changed BrowserRouter to HashRouter
import LandingPage from './components/LandingPage';
import ExpenseTracker from './components/ExpenseTracker';
import Footer from './components/Footer'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Routing setup */}
        <Routes>
          {/* Make sure the LandingPage is the default route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/tracker" element={<ExpenseTracker />} />
        </Routes>
        <Footer /> {/* Footer will be displayed on all pages */}
      </div>
    </Router>
  );
}

export default App;
