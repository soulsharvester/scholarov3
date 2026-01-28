import ScrollToTop from './components/ScrollToTop';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Instagram,
  Youtube,
  Music2,
} from 'lucide-react';
import { useLocation, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ContactForm from './components/ContactForm';
import '@fontsource/opendyslexic';
import { Link } from 'react-router-dom';
import FreeResources from './pages/FreeResources';
import SixthStop from './pages/SixthStop';
import Opportunities from './pages/Opportunities';
import Team from './pages/Team';
import { resources } from './data/resources';
import FeaturedResourceCard from './components/FeaturedResourceCard';

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0, duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.img
        src="/scholaro/logo.png"
        alt="Scholaro Logo"
        initial={{ scale: 0.2, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-72 h-72 object-contain"
      />
    </motion.div>
  );
}

type TeamMemberProps = {
  name: string;
  img: string;
  description: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, img, description }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="relative group cursor-pointer h-72 rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <img
        src={img}
        alt={name}
        className={`w-32 h-32 rounded-full object-cover mx-auto mb-4 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <p className="text-lg font-semibold text-cornflower-blue mb-2">{name}</p>
        <p className="text-gray-700 dark:text-gray-200">{description}</p>
      </div>
      <p className={`mt-2 font-semibold text-cornflower-blue transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>{name}</p>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Select featured resources by ID
  const featuredIds = [1, 2, 3]; // Change these IDs to whichever resources you want featured
  const featuredResources = resources.filter(r => featuredIds.includes(r.id));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 750);
    const visibilityTimer = setTimeout(() => setIsVisible(true), 1000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - window.innerHeight * 0.75;
        if (scrollPosition > sectionTop) {
          section.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      clearTimeout(visibilityTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.search === '?scrollTo=contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const nav = document.querySelector('nav');
        const yOffset = nav ? -nav.offsetHeight : -80;
        const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        // Only scroll if not already at the correct position
        if (Math.abs(window.pageYOffset - y) > 5) {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }
  }, [location]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <motion.section
                className="pt-32 pb-20 px-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="max-w-4xl mx-auto text-center">
                  <motion.h1
                    className="text-7xl font-bold mb-6 text-cornflower-blue"
                    variants={itemVariants}
                  >
                    21% of UK students speak English as a second language...
                  </motion.h1>
                  <motion.p
                    className="text-2xl mb-8 dark:text-gray-300"
                    variants={itemVariants}
                  >
                    
                  </motion.p>
                  <motion.p
                    className="text-2xl mb-8 dark:text-gray-300"
                    variants={itemVariants}
                  >
                    Yet for these students, language often closes doors, not opens them.
                  </motion.p>

                  <motion.p
                    className="text-2xl mb-8 dark:text-gray-300"
                    variants={itemVariants}
                  >
                    But Scholaro is here to change that.
                  </motion.p>
                </div>
              </motion.section>

              {/* Featured Resources Section */}
              <section className="py-20 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Featured Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredResources.map(resource => (
                      <FeaturedResourceCard
                        key={resource.id}
                        title={resource.title}
                        description={resource.description}
                        image={resource.image}
                        author={resource.author}
                        link={resource.link}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* What is Scholaro? Section */}
              <motion.section
                className="py-20 px-4 bg-white dark:bg-gray-900"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <motion.h2
                    className="text-4xl font-bold mb-12 text-center dark:text-white"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    What is Scholaro?
                  </motion.h2>
                  <motion.p
                    className="text-lg mb-6 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    *insert very inspiring text here about Scholaro's mission and talk about joining the Scholaro team*
                  </motion.p>
                </div>
              </motion.section>

            </>
          } />
          <Route path="/free-resources" element={<FreeResources />} />
          <Route path="/sixth-stop" element={<SixthStop />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/team" element={<Team />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-8">
          <motion.div
            className="max-w-7xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center space-x-6 mb-6">
              <motion.a
                href="https://www.linkedin.com/company/scholarouk/"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-cornflower-blue hover:text-white transition-colors duration-200 text-gray-600 dark:text-gray-300"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-cornflower-blue hover:text-white transition-colors duration-200 text-gray-600 dark:text-gray-300"
              >
                <Music2 className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-cornflower-blue hover:text-white transition-colors duration-200 text-gray-600 dark:text-gray-300"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/scholaro.uk/"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-cornflower-blue hover:text-white transition-colors duration-200 text-gray-600 dark:text-gray-300"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>
            <motion.p
              className="text-center mt-6 dark:text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              © 2025 Scholaro. All rights reserved.
            </motion.p>
          </motion.div>
        </footer>
      </div>
    </>
  );
}

export default App;
