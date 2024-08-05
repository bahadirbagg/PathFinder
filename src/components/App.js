import React, { useState } from 'react';
import Header from "./Header";
import Hero from "./Hero";
import Footer from './Footer';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

function App() {
  const [showForm, setShowForm] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginClick = () => setShowForm('login');
  const handleSignUpClick = () => setShowForm('signup');
  const handleClose = () => setShowForm(null);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowForm(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.clear();
    setShowForm(null);
  };

  if (isAuthenticated) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="relative">
      <Header onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} />
      <Hero onLoginClick={handleLoginClick} />
      <Footer />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-md">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl" onClick={handleClose}>
              &times;
            </button>
            {showForm === 'login' ? (
              <Login handleClose={handleClose} onLoginSuccess={handleLoginSuccess} openSignUp={handleSignUpClick} />
            ) : (
              <SignUp handleClose={handleClose} openLogin={handleLoginClick} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
