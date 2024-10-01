import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ExpenseTracker from './components/ExpenseTracker';
import Footer from './components/Footer'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tracker" element={<ExpenseTracker />} />
          {/* You can keep this if you want to use it later */}
          {/* <Route path="/summary" element={<ExpenseSummary />} /> */}
        </Routes>
        <Footer /> {/* Add Footer here */}
      </div>
    </Router>
  );
}

export default App;
