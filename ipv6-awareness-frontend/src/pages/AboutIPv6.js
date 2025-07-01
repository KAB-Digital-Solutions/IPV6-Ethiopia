import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGlobe, FaShieldAlt, FaBolt, FaServer, 
  FaMobileAlt, FaCloud, FaChartLine, FaCode,
  FaArrowRight, FaCheckCircle, FaRocket,
  FaNetworkWired, FaExchangeAlt, FaHistory
} from 'react-icons/fa';

// Professional color palette
const colors = {
  primary: '#00C389',
  primaryLight: '#E6F7F2',
  primaryDark: '#008C68',
  dark: '#1A1E26',
  light: '#F8FAFC',
  gray: '#6B7280',
  darkGray: '#374151'
};

// Abstract shape component for design accents
const AbstractShape = ({ type, color, size, position, rotation }) => {
  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'w-0 h-0 border-l-[50%] border-r-[50%] border-b-[100%] border-l-transparent border-r-transparent'
  };

  return (
  <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={`absolute ${shapes[type]} ${color}`}
    style={{
      width: size,
        height: type === 'triangle' ? 0 : size,
        left: position.x,
        top: position.y,
        transform: `rotate(${rotation}deg)`
    }}
  />
);
};

function AboutIPv6() {
  const [currentSection, setCurrentSection] = useState(0);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const sections = [
    {
      id: 'overview',
      title: 'Protocol Overview',
      features: [
        {
          title: 'Next-Generation Addressing',
          description: 'IPv6 introduces a 128-bit address space, providing 340 undecillion unique addresses to support global internet growth for decades to come.',
          highlights: [
            'Eliminates IPv4 address exhaustion',
            'Removes need for NAT',
            'Simplifies network architecture',
            'Enables true end-to-end connectivity'
          ]
        },
        {
          title: 'Technical Improvements',
          description: 'Designed with modern networking requirements in mind, IPv6 offers significant technical advantages over its predecessor.',
          highlights: [
            'Fixed 40-byte header',
            'Improved routing efficiency',
            'Enhanced multicast support',
            'Better QoS capabilities'
          ]
        }
      ]
    },
    {
      id: 'benefits',
      title: 'Enterprise Benefits',
      features: [
        {
          title: 'Security Advantages',
          description: 'With mandatory IPsec implementation, IPv6 provides a more secure foundation for network communications.',
          highlights: [
            'End-to-end encryption',
            'Improved authentication',
            'Reduced attack surface',
            'Better privacy features'
          ]
        },
        {
          title: 'Performance & Scalability',
          description: 'IPv6 enables more efficient network operations at global scale.',
          highlights: [
            'Faster routing decisions',
            'Reduced overhead',
            'Optimized for cloud',
            'IoT-ready architecture'
          ]
        }
      ]
    }
  ];

  const stats = [
    { value: '340', label: 'Undecillion Addresses', icon: <FaGlobe /> },
    { value: '45%+', label: 'Global Adoption', icon: <FaBolt /> },
    { value: '100%', label: 'IPsec Encryption', icon: <FaShieldAlt /> }
  ];

  const milestones = [
    {
      year: "1998",
      title: "Standardization",
      description: "IPv6 protocol published as RFC 2460, establishing the foundation for next-generation internet addressing.",
      icon: <FaCode />
    },
    {
      year: "2008",
      title: "Early Adoption",
      description: "Major organizations begin IPv6 implementation, with US government mandating IPv6 support for all agencies.",
      icon: <FaNetworkWired />
    },
    {
      year: "2012",
      title: "World IPv6 Launch",
      description: "Internet Society organizes global IPv6 launch event with participation from major ISPs and content providers.",
      icon: <FaGlobe />
    },
    {
      year: "2017",
      title: "Mobile Expansion",
      description: "Mobile networks lead IPv6 adoption with major carriers worldwide enabling IPv6 by default.",
      icon: <FaMobileAlt />
    },
    {
      year: "Present",
      title: "Accelerated Growth",
      description: "Global IPv6 traffic surpasses 40% as cloud providers and enterprises complete transitions.",
      icon: <FaChartLine />
    }
  ];

  const technicalDetails = [
    {
      title: "Header Structure",
      description: "IPv6 headers are simplified to 8 fields (vs 13 in IPv4) with a fixed 40-byte length.",
      items: [
        "Version (4-bit IPv6 version number)",
        "Traffic Class (8-bit DS/ECN field)",
        "Flow Label (20-bit flow identification)",
        "Payload Length (16-bit unsigned integer)",
        "Next Header (8-bit selector for extension headers)",
        "Hop Limit (8-bit decremented by each node)",
        "Source Address (128-bit)",
        "Destination Address (128-bit)"
      ]
    },
    {
      title: "Address Types",
      description: "IPv6 introduces several address types to support different networking needs:",
      items: [
        "Unicast (one-to-one communication)",
        "Multicast (one-to-many communication)",
        "Anycast (one-to-nearest communication)",
        "Link-local (local network communication)",
        "Unique Local (private network addressing)"
      ]
    },
    {
      title: "Transition Mechanisms",
      description: "Various methods exist to facilitate the transition from IPv4 to IPv6:",
      items: [
        "Dual Stack (simultaneous IPv4/IPv6 operation)",
        "Tunneling (encapsulating IPv6 in IPv4)",
        "Translation (protocol conversion)",
        "Proxying (intermediate communication)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-black dark:to-gray-900">
          <AbstractShape 
            type="circle" 
            color="bg-[#00C389]/10 dark:bg-gray-800" 
            size="400px" 
            position={{ x: '70%', y: '10%' }} 
            rotation={0}
          />
          <AbstractShape 
            type="square" 
            color="bg-[#00C389]/5 dark:bg-gray-800/50" 
            size="300px" 
            position={{ x: '10%', y: '60%' }} 
            rotation={45}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 sm:space-y-8"
              >
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#00C389]/10 text-[#00C389] text-sm font-medium dark:bg-gray-800 dark:text-[#00C389]"
              >
                <FaRocket className="mr-2" /> The Future of Networking
                </motion.div>
                
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#1A1E26] dark:text-white">Understanding </span>
                <span className="text-[#00C389]">IPv6</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl dark:text-gray-300">
                The next-generation Internet Protocol designed to overcome IPv4 limitations and enable secure, scalable global connectivity for decades to come.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link 
                  to="/IPv6Dashboard" 
                  className="px-4 sm:px-6 py-3 bg-[#00C389] text-white rounded-lg font-medium hover:bg-[#00C389]/90 transition duration-300 flex items-center justify-center shadow-md"
                >
                  Explore Dashboard <FaArrowRight className="ml-2" />
                </Link>
                <button 
                  onClick={scrollToFeatures}
                  className="px-4 sm:px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-300 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
                >
                  Learn More
                </button>
                </div>
              </motion.div>

              <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-4 sm:p-8 bg-[#1A1E26] text-white dark:bg-gray-700">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">IPv6 by the Numbers</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">Key metrics that define IPv6 capabilities</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {stats.map((stat, index) => (
                        <motion.div
                          key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-[#00C389]/10 p-3 sm:p-4 rounded-lg dark:bg-gray-600/20"
                    >
                      <div className="flex items-center mb-2">
                        <div className="p-2 rounded-full bg-[#00C389]/20 mr-3 dark:bg-gray-700">
                          {stat.icon}
                            </div>
                        <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
                            </div>
                      <p className="text-xs sm:text-sm text-gray-300">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
              </div>
              
              <div className="p-4 sm:p-8 dark:bg-gray-800">
                <h4 className="font-medium text-gray-700 mb-3 sm:mb-4 dark:text-gray-300 text-sm sm:text-base">IPv6 Address Example:</h4>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg dark:bg-gray-900">
                  <code className="font-mono text-gray-800 dark:text-gray-200 text-xs sm:text-sm break-all">
                    2001:0db8:85a3:0000:0000:8a2e:0370:7334
                  </code>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              IPv6 <span className="text-[#00C389]">Key Features</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Designed for the modern internet with security, scalability, and performance at its core
            </p>
          </div>

          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex flex-col sm:flex-row bg-gray-100 rounded-lg p-1 dark:bg-gray-800">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all text-sm sm:text-base ${currentSection === index ? 'bg-white text-[#00C389] shadow-sm dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
            >
              {sections[currentSection].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 dark:text-white">
                      {feature.title}
                            </h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 dark:text-gray-300 text-sm sm:text-base">
                      {feature.description}
                            </p>
                            <ul className="space-y-2 sm:space-y-3">
                      {feature.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <FaCheckCircle className="text-[#00C389] mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                </motion.div>
              ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
      </section>

      {/* Technical Comparison Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              IPv4 vs <span className="text-[#00C389]">IPv6</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Key technical differences between the protocols
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto dark:bg-gray-800 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Feature</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">IPv4</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-[#00C389] text-sm sm:text-base">IPv6</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-white text-sm sm:text-base">Address Length</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">32 bits</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">128 bits</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-white text-sm sm:text-base">Address Space</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">4.3 billion</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">340 undecillion</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-white text-sm sm:text-base">Header Size</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">Variable (20-60 bytes)</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">Fixed (40 bytes)</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-white text-sm sm:text-base">Security</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">Optional (IPsec)</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">Mandatory (IPsec)</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-gray-900 dark:text-white text-sm sm:text-base">Configuration</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">Manual or DHCP</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">Auto-configuration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              Technical <span className="text-[#00C389]">Details</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              In-depth look at IPv6 architecture and implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {technicalDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 dark:text-white">
                  {detail.title}
                </h3>
                <p className="text-gray-600 mb-4 dark:text-gray-300 text-sm sm:text-base">
                  {detail.description}
                </p>
                <ul className="space-y-2">
                  {detail.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#00C389] mt-2 mr-2 flex-shrink-0 dark:bg-gray-500"></span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Timeline Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              IPv6 <span className="text-[#00C389]">Adoption Timeline</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Key milestones in the evolution and deployment of IPv6
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => {
                const isRight = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row md:items-center ${isRight ? 'md:justify-start' : 'md:justify-end'} group`}
                  >
                    {/* Icon */}
                    <div className={`z-10 absolute md:static left-0 right-0 mx-auto md:mx-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#00C389]/10 flex items-center justify-center text-[#00C389] dark:bg-gray-700 dark:text-white
                      ${isRight ? 'md:order-1 md:left-1/2 md:-ml-8' : 'md:order-2 md:right-1/2 md:-mr-8'}`}
                    >
                      {milestone.icon}
                    </div>
                    {/* Card */}
                    <div className={`mt-16 md:mt-0 md:w-1/2 ${isRight ? 'md:pr-12 md:order-2 md:text-left' : 'md:pl-12 md:order-1 md:text-right'}`}>
                      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-sm font-medium text-[#00C389] mb-1">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              Enterprise <span className="text-[#00C389]">Benefits</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              How organizations gain from IPv6 adoption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00C389]/10 flex items-center justify-center text-[#00C389] mb-4 dark:bg-gray-700">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Enhanced Security</h3>
              <p className="text-gray-600 mb-4 dark:text-gray-300">
                Built-in IPsec provides end-to-end encryption and authentication, reducing vulnerabilities inherent in IPv4 networks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00C389] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Mandatory encryption</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00C389] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Reduced attack surface</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00C389]/10 flex items-center justify-center text-[#00C389] mb-4 dark:bg-gray-700">
                <FaBolt className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Network Performance</h3>
              <p className="text-gray-600 mb-4 dark:text-gray-300">
                Simplified header and improved routing lead to faster packet processing and reduced latency.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00C389] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">40% faster routing</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00C389] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Reduced overhead</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00C389]/10 flex items-center justify-center text-[#00C389] mb-4 dark:bg-gray-700">
                <FaGlobe className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white">Future Scalability</h3>
              <p className="text-gray-600 mb-4 dark:text-gray-300">
                Massive address space supports IoT, 5G, and emerging technologies without workarounds.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00C389] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Trillions of devices</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00C389] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Cloud-native ready</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1E26] text-white dark:bg-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 dark:text-white">
              Ready to explore IPv6 adoption?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Access our interactive dashboard to see global IPv6 deployment metrics and trends.
            </p>
            <Link
              to="/IPv6Dashboard" 
              className="inline-flex items-center px-8 py-4 bg-[#00C389] text-white rounded-lg font-medium hover:bg-[#00C389]/90 transition duration-300 shadow-lg"
            >
              View IPv6 Dashboard <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutIPv6; 