import React from "react";
import logo from "../logo.svg";

function Header({ onLoginClick, onSignUpClick }) {
  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-blue-600 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <a href="#">
              <img src={logo} alt="PathFinder Logo" className="h-10" />
            </a>
            <span className="text-white text-2xl font-bold ml-2">PathFinder</span>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              onClick={onLoginClick}
              className="text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </button>
            <button
              onClick={onSignUpClick}
              className="text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
