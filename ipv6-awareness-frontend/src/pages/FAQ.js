import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaNetworkWired, FaShieldAlt, FaTools, FaQuestionCircle, FaGlobe } from 'react-icons/fa';

function FAQ() {
  const [openCategory, setOpenCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    {
      id: 'general',
      title: 'General IPv6',
      icon: <FaGlobe className="w-6 h-6" />,
      questions: [
        {
          id: 'what-is-ipv6',
          question: 'What is IPv6 and why do we need it?',
          answer: `IPv6 (Internet Protocol version 6) is the most recent version of the Internet Protocol, designed to replace IPv4. We need IPv6 because:
          • IPv4 addresses are running out (only about 4.3 billion addresses)
          • IPv6 provides 340 undecillion unique addresses
          • Better security features built-in
          • Improved routing efficiency
          • Better support for mobile devices
          • Enhanced quality of service capabilities`
        },
        {
          id: 'ipv6-format',
          question: 'What does an IPv6 address look like?',
          answer: `An IPv6 address consists of 128 bits, written as 8 groups of 16-bit hexadecimal values, separated by colons. For example:
          2001:0db8:85a3:0000:0000:8a2e:0370:7334
          
          Common features:
          • Groups of zeros can be shortened with ::
          • Leading zeros in a group can be omitted
          • Example of shortened form: 2001:db8:85a3::8a2e:370:7334`
        },
        {
          id: 'ipv6-adoption',
          question: 'What is the current state of IPv6 adoption?',
          answer: `As of 2024, global IPv6 adoption is growing:
          • Approximately 40% of Google users access via IPv6
          • Major ISPs and mobile carriers have deployed IPv6
          • Many cloud providers support IPv6
          • Government agencies are mandating IPv6 support
          • Enterprise adoption is increasing steadily`
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Questions',
      icon: <FaTools className="w-6 h-6" />,
      questions: [
        {
          id: 'dual-stack',
          question: 'What is dual-stack networking?',
          answer: `Dual-stack networking means running IPv4 and IPv6 simultaneously:
          • Allows gradual transition to IPv6
          • Maintains compatibility with IPv4-only systems
          • Provides fallback options
          • Enables testing and validation
          • Recommended for most networks during transition`
        },
        {
          id: 'ipv6-testing',
          question: 'How can I test my IPv6 connectivity?',
          answer: `You can test your IPv6 connectivity in several ways:
          • Visit test-ipv6.com for comprehensive testing
          • Use command line tools (ping6, traceroute6)
          • Check your router's IPv6 status
          • Verify with your ISP
          • Use online IPv6 testing tools`
        },
        {
          id: 'ipv6-security',
          question: 'Is IPv6 more secure than IPv4?',
          answer: `IPv6 includes several security improvements:
          • Built-in IPsec support
          • No need for NAT (reduces certain attack vectors)
          • Better address space for security tools
          • Improved packet header structure
          • Enhanced privacy features
          
          However, proper security implementation is still crucial.`
        }
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation',
      icon: <FaNetworkWired className="w-6 h-6" />,
      questions: [
        {
          id: 'router-setup',
          question: 'How do I enable IPv6 on my router?',
          answer: `To enable IPv6 on your router:
          1. Access your router's admin interface
          2. Look for IPv6 or Internet Protocol settings
          3. Enable IPv6 support
          4. Choose automatic configuration (recommended)
          5. Save settings and restart if needed
          
          Note: Your ISP must support IPv6 for this to work.`
        },
        {
          id: 'os-support',
          question: 'Which operating systems support IPv6?',
          answer: `Most modern operating systems support IPv6:
          • Windows 10/11 (enabled by default)
          • macOS (enabled by default)
          • Linux distributions
          • iOS and Android
          • Most server operating systems
          
          Some older systems may need manual configuration.`
        },
        {
          id: 'business-case',
          question: 'What is the business case for IPv6?',
          answer: `The business case for IPv6 includes:
          • Future-proofing your network
          • Avoiding IPv4 address exhaustion
          • Better performance and efficiency
          • Enhanced security capabilities
          • Support for IoT and new technologies
          • Compliance with government mandates
          • Competitive advantage`
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Best Practices',
      icon: <FaShieldAlt className="w-6 h-6" />,
      questions: [
        {
          id: 'firewall-rules',
          question: 'How do I secure my IPv6 network?',
          answer: `To secure your IPv6 network:
          • Configure IPv6 firewall rules
          • Use proper access control lists
          • Implement IPsec where appropriate
          • Monitor IPv6 traffic
          • Keep systems updated
          • Use security best practices
          • Regular security audits`
        },
        {
          id: 'privacy-concerns',
          question: 'What are the privacy implications of IPv6?',
          answer: `IPv6 privacy considerations:
          • Larger address space makes scanning harder
          • Privacy extensions available
          • Temporary addresses can be used
          • Better control over address assignment
          • Reduced need for NAT
          
          Always review privacy settings in your implementation.`
        },
        {
          id: 'common-mistakes',
          question: 'What are common IPv6 implementation mistakes?',
          answer: `Common IPv6 implementation mistakes:
          • Not planning for dual-stack operation
          • Incorrect firewall configuration
          • Poor address planning
          • Missing security features
          • Inadequate testing
          • Not considering legacy systems
          • Poor documentation`
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
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
              Frequently Asked <span className="text-[#00C389]">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Find answers to common questions about IPv6
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setOpenCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    openCategory === category.id
                      ? 'bg-[#00C389] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.icon}
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            {/* Questions and Answers */}
            <div className="space-y-4">
              {categories
                .find(cat => cat.id === openCategory)
                ?.questions.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      <span className="text-lg font-semibold text-[#1A1E26] dark:text-white">
                        {item.question}
                      </span>
                      <FaChevronDown
                        className={`w-5 h-5 text-[#00C389] transform transition-transform duration-300 ${
                          openQuestions[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openQuestions[item.id] && (
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                        <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#00C389]/10 flex items-center justify-center">
                  <FaQuestionCircle className="w-6 h-6 text-[#00C389]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1E26] dark:text-white">
                  Still Have Questions?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Can't find what you're looking for? Contact our support team for assistance.
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Email: contact@ipv6et.org
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Visit our <a href="/contact" className="text-[#00C389] hover:underline">Contact page</a> for more ways to reach us.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ; 