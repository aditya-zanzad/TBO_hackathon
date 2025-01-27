import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import location_logo from '../assets/images/location_logo.png';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`  fixed top-0 w-full z-10 p-4 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-70 backdrop-blur-md' : 'bg-transparent'
      } text-white`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <ul className="hidden md:flex justify-around w-full items-center text-sm font-bold">
          <li>
            <Link to="/" className="hover:text-primary transition duration-200">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/Itinerary" className="hover:text-primary transition duration-200">
              ITINERARY
            </Link>
          </li>
          <li>
            <Link to="/gallery">
              <motion.div
                className="shadow-lg rounded-xl overflow-hidden"
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <img className="w-16 md:w-24" src={location_logo} alt="Location Logo" />
              </motion.div>
            </Link>
          </li>
          <li>
            <Link to="/hotels" className="hover:text-primary transition duration-200">
              TOURS
            </Link>
          </li>
          <li>
            <Link to="/Login" className="hover:text-primary transition duration-200">
              LOGIN
            </Link>
          </li>
        </ul>

        {/* for Mobile Screen */}
        <div className="md:hidden flex items-center">
          <button
            className="text-green-500 focus:outline-none"
            onClick={handleMobileMenuToggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-black bg-opacity-90 text-white p-4 md:hidden">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/Itinerary"
                className="hover:text-primary transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ITINERARY
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="hover:text-primary transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GALLERY
              </Link>
            </li>
            <li>
              <Link
                to="/hotels"
                className="hover:text-primary transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TOURS
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                className="hover:text-primary transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
