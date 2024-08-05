import React, { useState } from 'react';
import Login from "./Login";
import Typewriter from "typewriter-effect";
import bg from "../bg.png"

function Hero({ onLoginClick }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {!showLogin ? (
        <div className="relative h-screen flex flex-col justify-center items-center text-center p-4">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bg})`,
              opacity: 0.7,
              zIndex: -1,
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">
              <Typewriter
                options={{
                  strings: ["Find Your Dream Job", "Join Top Companies", "Advance Your Career"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Discover the best job opportunities and start your journey today.
            </p>
            <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"  onClick={onLoginClick}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Hero;
