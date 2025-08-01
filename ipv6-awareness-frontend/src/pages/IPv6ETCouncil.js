import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGlobe, FaUsers, FaLightbulb, FaShieldAlt, FaHandshake, FaGraduationCap, FaIndustry, FaUniversity, FaBuilding, FaStar, FaCheckCircle, FaRocket, FaAward, FaNetworkWired, FaChartLine, FaCogs, FaEye } from 'react-icons/fa';
import ipv6ForumLogo from '../assets/images/ipv6_forum.png';

function IPv6ETCouncil() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const councilSlides = [
    {
      title: "Government Collaboration",
      description: "Working closely with government agencies to establish IPv6 policies and regulations that support Ethiopia's digital transformation goals.",
      icon: <FaBuilding className="text-4xl md:text-6xl text-[#00C389]" />,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Industry Partnership",
      description: "Collaborating with telecommunications and technology companies to implement IPv6 infrastructure and best practices across Ethiopia.",
      icon: <FaIndustry className="text-4xl md:text-6xl text-[#00C389]" />,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Academic Excellence",
      description: "Partnering with universities and research institutions to advance IPv6 knowledge and develop local expertise in next-generation networking.",
      icon: <FaUniversity className="text-4xl md:text-6xl text-[#00C389]" />,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Community Building",
      description: "Fostering a strong IPv6 community in Ethiopia through education, training, and knowledge sharing initiatives.",
      icon: <FaUsers className="text-4xl md:text-6xl text-[#00C389]" />,
      color: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const achievements = [
    { icon: <FaStar />, title: "National Recognition", description: "Officially recognized by the Ethiopian government", number: "100%" },
    { icon: <FaCheckCircle />, title: "Expert Network", description: "50+ networking experts and professionals", number: "50+" },
    { icon: <FaRocket />, title: "Rapid Growth", description: "Expanding across all regions of Ethiopia", number: "11" },
    { icon: <FaAward />, title: "Global Partnership", description: "Official IPv6 Forum Chapter status", number: "1st" }
  ];

  useEffect(() => {
    let interval;
    if (autoPlay && !isHovering) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % councilSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, isHovering, councilSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % councilSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + councilSlides.length) % councilSlides.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section - Mobile Responsive */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-8">
        {/* Background with geometric patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#00C389]/5 to-[#00C389]/10 dark:from-black dark:via-[#00C389]/10 dark:to-[#00C389]/20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-4 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 border-2 border-[#00C389]/20 rounded-full"></div>
            <div className="absolute top-40 right-4 sm:right-40 w-12 sm:w-24 h-12 sm:h-24 bg-[#00C389]/10 rounded-full"></div>
            <div className="absolute bottom-20 left-1/3 w-8 sm:w-16 h-8 sm:h-16 border border-[#00C389]/30 rounded-full"></div>
            <div className="absolute bottom-40 right-4 sm:right-20 w-10 sm:w-20 h-10 sm:h-20 bg-[#00C389]/15 rounded-full"></div>
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex justify-center">
            {/* Single Card Design with Image Inside - Mobile Responsive */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-6xl"
            >
                             <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-8 shadow-2xl border border-gray-200 dark:border-gray-700 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                 <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[450px]">
                                     {/* Left Content - Mobile Responsive */}
                   <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                   >
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#00C389] to-[#009C6B] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                        <FaNetworkWired className="text-white text-lg sm:text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-xs sm:text-sm font-semibold text-[#00C389] uppercase tracking-wider">IPv6 Ethiopia</h2>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-white">
                          Council
                        </h1>
                      </div>
                    </div>
                    
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                      Advancing IPv6 adoption and building Ethiopia's digital future through collaboration, education, and innovation
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Link 
                        to="/GetInvolved" 
                        className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-bold text-white transition-all duration-300 ease-out transform bg-gradient-to-r from-[#00C389] to-[#009C6B] hover:from-[#009C6B] hover:to-[#00C389] rounded-xl sm:rounded-2xl hover:scale-105 hover:shadow-2xl shadow-lg text-sm sm:text-base"
                      >
                        <span className="relative flex items-center gap-2 sm:gap-3">
                          Join the Council
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-2 transition-transform" />
                        </span>
                      </Link>
                      
                      <Link 
                        to="/contact" 
                        className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-bold text-[#00C389] dark:text-white transition-all duration-300 ease-out transform border-2 border-[#00C389] hover:bg-[#00C389] hover:text-white rounded-xl sm:rounded-2xl hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
                      >
                        <span className="relative flex items-center gap-2 sm:gap-3">
                          Contact Us
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-2 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>

                                                        {/* Right Image - Mobile Responsive */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="flex justify-center order-1 lg:order-2 mb-12 lg:mb-0 mt-8 lg:mt-0"
                    >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00C389]/20 to-[#009C6B]/20 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
                                             <div className="relative bg-white/50 dark:bg-gray-800/50 rounded-2xl sm:rounded-3xl p-2 sm:p-4 md:p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                                                 <img 
                           src={ipv6ForumLogo} 
                           alt="IPv6 Forum Logo" 
                           className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-auto object-contain drop-shadow-2xl"
                         />
                        <motion.div
                          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#00C389] rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaEye className="text-white text-xs sm:text-sm" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Mobile Responsive Timeline */}
      <section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C389]/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6">
              About <span className="text-[#00C389] bg-gradient-to-r from-[#00C389] to-[#009C6B] bg-clip-text text-transparent">IPv6 Ethiopia Council</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4">
              IPv6 Ethiopia is an initiative aimed at raising awareness about IPv6, its importance, and its adoption across the country. 
              As the foundation of the future, we collaborate with key stakeholders to achieve Ethiopia's digital transformation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#00C389] to-[#009C6B]"></div>
            
            {[
              {
                icon: <FaGlobe />,
                title: "Our Foundation",
                text: "IPv6 Ethiopia is an initiative aimed at raising awareness about IPv6, its importance, and its adoption across the country. As the foundation of the future, the Ethiopia IPv6 Council will collaborate with key stakeholders from government, industry and academia to work jointly on the Ethiopia IPv6 roadmap milestones with collaborative vision for Ethiopia and focusing its efforts to achieve the adoption of the new Internet world based on IPv6.",
                position: "left"
              },
              {
                icon: <FaRocket />,
                title: "Our Mission",
                text: "The prime objective of the Ethiopia IPv6 Council and its members is to promote deployment and coordinated uptake of the Internet Protocol version 6 (IPv6) with support from industry, education, research communities and government agencies enabling equitable access to technology and knowledge.",
                position: "right"
              },
              {
                icon: <FaLightbulb />,
                title: "Our Vision",
                text: "The Ethiopia IPv6 Council has been created to extend to the Ethiopia Internet community and forge a strong voice and representation in the new Internet world and create momentum in deploying IPv6 and gradually sunset IPv4.",
                position: "left"
              },
              {
                icon: <FaHandshake />,
                title: "Global Partnership",
                text: "The Ethiopia IPv6 Council is a Chapter of the IPv6 Forum dedicated to the advancement and promotion of IPv6 best practices and lessons learned. The Council's mission is to provide technical leadership and innovative thought for the successful integration of IPv6 into all facets of networking and telecommunications infrastructure, present and future. The Ethiopia Council collaborates within the IPv6 Forum with other national based councils in creating a peer reviewed compendium of recommended IPv6 specific standards and deployment best practices.",
                position: "right"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: item.position === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`mb-8 sm:mb-12 md:mb-16 ${
                  // Mobile: Stack vertically, Desktop: Use original layout
                  'md:flex md:items-center' + (item.position === "left" ? " md:flex-row" : " md:flex-row-reverse")
                }`}
              >
                {/* Mobile: Full width, Desktop: Half width */}
                <div className={`w-full md:w-1/2 ${item.position === "left" ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-700 relative">
                    {/* Mobile: Add timeline dot */}
                    <div className="md:hidden absolute -left-3 top-8 w-6 h-6 bg-[#00C389] rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00C389] to-[#009C6B] rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                        {item.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                </div>
                
                {/* Desktop timeline dot */}
                <div className="hidden md:block w-8 h-8 bg-[#00C389] rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Council Pillars Section - Mobile Responsive Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#00C389]/5 via-[#00C389]/10 to-[#00C389]/5 dark:from-[#00C389]/10 dark:via-[#00C389]/20 dark:to-[#00C389]/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-4 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 bg-[#00C389]/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-4 sm:right-20 w-20 sm:w-40 h-20 sm:h-40 bg-[#00C389]/10 rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-black dark:text-white"
            >
              Council <span className="text-[#00C389] bg-gradient-to-r from-[#00C389] to-[#009C6B] bg-clip-text text-transparent">Pillars</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {councilSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 transform hover:scale-105 h-full flex flex-col">
                    <div className="mb-4 sm:mb-6 bg-gradient-to-r from-[#00C389]/20 to-[#009C6B]/20 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      {slide.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-black dark:text-white text-center">{slide.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center flex-grow">{slide.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section - Mobile Responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-[#00C389]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-[#00C389]/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/20 dark:border-gray-700/20"
            >
              <h4 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 sm:mb-8 text-center">Organization Contact</h4>
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center p-6 sm:p-8 bg-gradient-to-r from-[#00C389]/10 to-[#009C6B]/10 rounded-xl sm:rounded-2xl border border-[#00C389]/20">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-[#00C389] to-[#009C6B] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                    <FaUsers className="text-4xl sm:text-6xl text-white" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#00C389] mb-2">Dr. Zelalem W. Mengistu</p>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">President, IPv6 Ethiopia Council</p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    Leading the charge for IPv6 adoption in Ethiopia, Dr. Zelalem W. Mengistu brings extensive expertise 
                    in networking and telecommunications to guide the council's mission of advancing IPv6 deployment 
                    across the country. With a vision for digital transformation, Dr. Mengistu is committed to building 
                    a connected future for Ethiopia through strategic partnerships with government, industry, and academia.
                  </p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h5 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Contact Information</h5>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">For inquiries and collaboration opportunities</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default IPv6ETCouncil;
