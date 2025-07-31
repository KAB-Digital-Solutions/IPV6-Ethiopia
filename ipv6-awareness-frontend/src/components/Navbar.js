// === src/components/Navbar.js ===
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/images/logo.jpg';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Mission', path: '/our-mission' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-bg-primary/95 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-dark-bg-primary'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2 group -ml-4">
              <img 
                src={logo} 
                alt="IPv6 Logo" 
                className="h-[90px] w-auto object-contain transform group-hover:scale-110 transition-transform duration-300 -mt-2"
              />
              <div className="flex items-center">
                <span className="text-xl font-bold text-black dark:text-white transition-colors">
                  <span className="text-[#00b741]">IPv6</span>{' '}
                  <span className="text-[#c99a06]">ETHIOPIA</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-4">
              <ul className="flex space-x-6">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/AboutIPv6', label: 'About IPv6' },
                  { path: '/IPv6ETCouncil', label: 'IPv6 ET Council' },
                  { path: '/resources', label: 'Resources' },
                  { path: '/events', label: 'Events' },
                  { path: '/GetInvolved', label: 'Get Involved' },
                  { path: '/IPv6Dashboard', label: 'Dashboard' },
                  { path: '/blog', label: 'Blog' }
                ].map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`relative px-2 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
                        isActive(path)
                          ? 'text-[#00C389]'
                          : 'text-black dark:text-white hover:text-[#00C389]'
                      }`}
                    >
                      {label}
                      {isActive(path) && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00C389]" />
                      )}
                    </Link>
                  </li>
                ))}
                {/* Contact as Green Button */}
                <li>
                  <Link
                    to="/contact"
                    className={`px-3 py-2 font-medium text-sm transition-all duration-300 whitespace-nowrap bg-gradient-to-r from-[#00C389] to-[#009C6B] hover:from-[#009C6B] hover:to-[#00C389] text-white rounded-lg hover:scale-105 hover:shadow-lg ${
                      isActive('/contact') ? 'shadow-lg' : ''
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden md:flex lg:hidden items-center space-x-3">
              <ul className="flex space-x-3">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/AboutIPv6', label: 'About IPv6' },
                  { path: '/IPv6ETCouncil', label: 'IPv6 ET Council' },
                  { path: '/resources', label: 'Resources' },
                  { path: '/events', label: 'Events' },
                  { path: '/GetInvolved', label: 'Get Involved' },
                  { path: '/IPv6Dashboard', label: 'Dashboard' },
                  { path: '/blog', label: 'Blog' }
                ].map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`relative px-1 py-1 font-medium text-xs transition-colors whitespace-nowrap ${
                        isActive(path)
                          ? 'text-[#00C389]'
                          : 'text-black dark:text-white hover:text-[#00C389]'
                      }`}
                    >
                      {label}
                      {isActive(path) && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00C389]" />
                      )}
                    </Link>
                  </li>
                ))}
                {/* Contact as Green Button */}
                <li>
                  <Link
                    to="/contact"
                    className={`px-2 py-1 font-medium text-xs transition-all duration-300 whitespace-nowrap bg-gradient-to-r from-[#00C389] to-[#009C6B] hover:from-[#009C6B] hover:to-[#00C389] text-white rounded hover:scale-105 hover:shadow-lg ${
                      isActive('/contact') ? 'shadow-lg' : ''
                    }`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-bg-tertiary hover:bg-gray-200 dark:hover:bg-dark-bg-secondary transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-[#00C389]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-white dark:bg-dark-bg-secondary`}>
            <div className="grid grid-cols-2 gap-3 p-6">
              {[
                { path: '/', label: 'Home' },
                { path: '/AboutIPv6', label: 'About IPv6' },
                { path: '/IPv6ETCouncil', label: 'IPv6 ET Council' },
                { path: '/resources', label: 'Resources' },
                { path: '/events', label: 'Events' },
                { path: '/GetInvolved', label: 'Get Involved' },
                { path: '/IPv6Dashboard', label: 'Dashboard' },
                { path: '/blog', label: 'Blog' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-3 rounded-lg transition-colors text-center text-sm font-medium ${
                    isActive(path)
                      ? 'bg-[#00C389]/10 text-[#00C389]'
                      : 'text-black dark:text-white hover:bg-[#00C389]/10 hover:text-[#00C389]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Dark Mode Toggle - Bottom Right Corner */}
      <motion.button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {darkMode ? (
          <FaSun className="w-6 h-6 text-[#00C389]" />
        ) : (
          <FaMoon className="w-6 h-6 text-[#00C389]" />
        )}
      </motion.button>
    </>
  );
}

export default Navbar;
