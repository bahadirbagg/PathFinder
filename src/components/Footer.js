import React from "react";
import logo from "../logo.svg";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-4">
            <a href="#">
              <img src={logo} alt="PathFinder Logo" className="h-10" />
            </a>
            <span className="text-lg font-bold">
              Ready to Get Started
            </span>
          </div>
          <p className="text-sm max-w-xs">
            Find your dream job with us. We connect you to the best opportunities available. Explore job listings and take the next step in your career.
          </p>
        </div>
        <div className="border-r border-white h-16 mx-6 hidden md:block"></div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
          <div className="text-base md:text-sm">
            © 2010-2024 Privacy-Terms
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
