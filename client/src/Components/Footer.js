import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-7 h-7 hover:text-pink-500 transition duration-300" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-7 h-7 hover:text-blue-500 transition duration-300" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-7 h-7 hover:text-red-500 transition duration-300" />
            </a>
          </div>
          <p className="text-sm mt-3">&copy; {new Date().getFullYear()} Peak Perform. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  

export default Footer;
