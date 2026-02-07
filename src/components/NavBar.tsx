import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Settings2 } from 'lucide-react';
import AccessibilityMenu from './AccessibilityMenu';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Replace these with your actual form links
  const CONTACT_FORM_LINK = "https://forms.gle/your-contact-form-link";
  const JOIN_US_FORM_LINK = "https://forms.gle/your-join-us-form-link";

  const navLinks = [
    { to: '/team', label: 'Team' },
    { to: '/free-resources', label: 'Resources' },
    { to: '/sixth-stop', label: 'Sixth Stop' },
    { to: '/opportunities', label: 'Opportunities' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo acts as home button */}
        <Link to="/" className="flex items-center space-x-2" onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen(false);
          if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            navigate('/');
          }
        }}>
          <img src="/scholaro/logo.png" alt="Scholaro Logo" className="w-10 h-10 object-contain" />
          <span className={`font-bold text-2xl transition-colors duration-200 ${
            location.pathname === '/' ? 'text-cornflower-blue' : 'text-gray-800 dark:text-white'
          }`}>
            Scholaro
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`hover:text-cornflower-blue transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'text-cornflower-blue'
                  : 'text-gray-800 dark:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Contact link opens form in new tab */}
          <a
            href={CONTACT_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cornflower-blue transition-colors duration-200 text-gray-800 dark:text-white"
          >
            Contact
          </a>
          {/* Join Us button */}
          <a
            href={"https://docs.google.com/forms/d/1aRJE0ZUiFJccNLBjBVKck3j0uqQrbSB_Fp0EfXrvbxk/viewform?edit_requested=true"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-cornflower-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
            title="Join Us"
          >
            <span>Join Us</span>
          </a>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300"
            aria-label="Accessibility menu"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile: Hamburger, Dark Mode, Accessibility */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-gray-800 dark:text-white" />
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300"
            aria-label="Accessibility menu"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
        <AccessibilityMenu
          isOpen={isAccessibilityOpen}
          onClose={() => setIsAccessibilityOpen(false)}
        />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex lg:hidden">
          <div className="w-64 bg-white dark:bg-gray-900 h-full shadow-lg flex flex-col p-6">
            <button
              className="self-end mb-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7 text-gray-800 dark:text-white" />
            </button>
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className={`mb-4 text-lg hover:text-cornflower-blue transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-cornflower-blue'
                    : 'text-gray-800 dark:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* Contact link opens form in new tab */}
            <a
              href={CONTACT_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 text-lg hover:text-cornflower-blue transition-colors duration-200 text-gray-800 dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            {/* Join Us button */}
            <a
              href={"https://docs.google.com/forms/d/1aRJE0ZUiFJccNLBjBVKck3j0uqQrbSB_Fp0EfXrvbxk/viewform?edit_requested=true"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-cornflower-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2 mb-4"
              title="Join Us"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Join Us</span>
            </a>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu overlay"
          />
        </div>
      )}
    </nav>
  );
}
