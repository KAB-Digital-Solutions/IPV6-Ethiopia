// === src/App.js ===
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Main Navigation Pages
import Home from './pages/Home';
import AboutIPv6 from './pages/AboutIPv6';
import Resources from './pages/Resources';
import Events from './pages/Events';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import IPv6Dashboard from './pages/IPv6Dashboard';
import BlogPost from './pages/BlogPost';
import IPv6ETCouncil from './pages/IPv6ETCouncil';


// Company Pages
import OurMission from './pages/OurMission';


// Support Pages
import FAQ from './pages/FAQ';


// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Error Pages
import NotFound from './pages/NotFound';

// Global styles
const globalStyles = {
  mainContent: "flex-grow min-h-screen w-full",
  contentWrapper: "w-full h-full",
  transitions: "transition-all duration-300 ease-in-out"
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Page transition component with enhanced animations
const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div
        key={location.pathname}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20, 
          scale: 0.98,
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1]
          }
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </AnimatePresence>
  );
};

// Main App component
function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-white to-[#004D00]/5 dark:from-[#004D00]/5 dark:to-[#004D00]/10">
          <Navbar />
          <main className={globalStyles.mainContent}>
            <div className={globalStyles.contentWrapper}>
              <PageTransition>
                <Routes>
                  {/* Main Navigation - Matches Navbar */}
                  <Route path="/" element={<Home />} />
                  <Route path="/AboutIPv6" element={<AboutIPv6 />} />
                  <Route path="/IPv6ETCouncil" element={<IPv6ETCouncil />} />
                  <Route path="/Resources" element={<Resources />} />
                  <Route path="/Events" element={<Events />} />
                  <Route path="/GetInvolved" element={<GetInvolved />} />
                  <Route path="/IPv6Dashboard" element={<IPv6Dashboard />} />
                  <Route path="/Blog" element={<Blog />} />
                  <Route path="/Blog/:id" element={<BlogPost />} />
                  <Route path="/Contact" element={<Contact />} />

                  {/* Company Section - Matches Footer */}
                  <Route path="/OurMission" element={<OurMission />} />

                  {/* Support Section - Matches Footer */}
                  <Route path="/FAQ" element={<FAQ />} />

                  {/* Legal Section - Matches Footer */}
                  <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                  <Route path="/TermsOfService" element={<TermsOfService />} />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;