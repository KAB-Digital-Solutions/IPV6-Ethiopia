// === src/pages/GetInvolved.js ===
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaNetworkWired, FaCode, FaHandshake, FaGraduationCap, FaRocket, FaChartLine, FaTools } from 'react-icons/fa';

function GetInvolved() {
  const userPaths = [
    {
      title: 'Network Engineers',
      description: 'Learn about IPv6 implementation, testing, and best practices for your network.',
      icon: <FaNetworkWired className="text-4xl text-[#00C389]" />,
      actions: [
        {
          text: 'Test Your IPv6',
          link: 'https://test-ipv6.com/',
          external: true
        },
        {
          text: 'View Resources',
          link: '/resources',
          external: false
        }
      ]
    },
    {
      title: 'Developers',
      description: 'Find tools, libraries, and documentation to implement IPv6 in your applications.',
      icon: <FaCode className="text-4xl text-[#00C389]" />,
      actions: [
        {
          text: 'Development Guide',
          link: '/resources',
          external: false
        },
        {
          text: 'Code Examples',
          link: '/resources',
          external: false
        }
      ]
    },
    {
      title: 'Organizations',
      description: 'Get support for IPv6 adoption, training, and implementation in your organization.',
      icon: <FaHandshake className="text-4xl text-[#00C389]" />,
      actions: [
        {
          text: 'Contact Us',
          link: '/contact',
          external: false
        },
        {
          text: 'Learn More',
          link: '/AboutIPv6',
          external: false
        }
      ]
    },
    {
      title: 'Everyone',
      description: 'Learn about IPv6, its importance, and how it affects the future of the internet.',
      icon: <FaGraduationCap className="text-4xl text-[#00C389]" />,
      actions: [
        {
          text: 'About IPv6',
          link: '/AboutIPv6',
          external: false
        },
        {
          text: 'FAQ',
          link: '/faq',
          external: false
        }
      ]
    }
  ];

  const quickStats = [
    {
      title: 'IPv6 Ready',
      value: '30%',
      icon: <FaRocket className="text-2xl text-[#00C389]" />,
      description: 'of websites support IPv6'
    },
    {
      title: 'Growth Rate',
      value: '15%',
      icon: <FaChartLine className="text-2xl text-[#00C389]" />,
      description: 'yearly IPv6 adoption'
    },
    {
      title: 'Tools Available',
      value: '100+',
      icon: <FaTools className="text-2xl text-[#00C389]" />,
      description: 'for IPv6 implementation'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-black dark:to-gray-900">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00C389]/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#00C389]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-[#00C389]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#1A1E26] dark:text-white">
              Join the <span className="text-[#00C389]">IPv6</span> Revolution
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Be part of the next generation of internet technology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://test-ipv6.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#00C389] text-white rounded-lg font-medium hover:bg-[#00C389]/90 transition duration-300 flex items-center shadow-md"
              >
                Test Your IPv6 <FaArrowRight className="ml-2" />
              </a>
              <Link
                to="/AboutIPv6"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-300 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-gray-800 dark:to-gray-900 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00C389]/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1E26] dark:text-white">{stat.title}</h3>
                    <p className="text-3xl font-bold text-[#00C389]">{stat.value}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Paths Section with Cards */}
      <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#1A1E26] dark:text-white">
              Choose Your <span className="text-[#00C389]">Path</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find the right resources and tools for your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {userPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group p-8 rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-[#00C389]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {path.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-4 text-[#1A1E26] dark:text-white">
                      {path.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {path.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {path.actions.map((action, actionIndex) => (
                        action.external ? (
                          <a
                            key={actionIndex}
                            href={action.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-[#00C389] text-white rounded-lg font-medium hover:bg-[#00C389]/90 transition duration-300 flex items-center shadow-md"
                          >
                            {action.text} <FaArrowRight className="ml-2" />
                          </a>
                        ) : (
                          <Link
                            key={actionIndex}
                            to={action.link}
                            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-300 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            {action.text}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#1A1E26] dark:text-white">
              Ready to <span className="text-[#00C389]">Start</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Take the first step towards IPv6 adoption today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://test-ipv6.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#00C389] text-white rounded-lg font-medium hover:bg-[#00C389]/90 transition duration-300 flex items-center shadow-md"
              >
                Test Your IPv6 <FaArrowRight className="ml-2" />
              </a>
              <Link
                to="/resources"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-300 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default GetInvolved;