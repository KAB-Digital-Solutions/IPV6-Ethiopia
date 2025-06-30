import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaUserCheck, FaTools, FaExclamationTriangle } from 'react-icons/fa';

function TermsOfService() {
  const sections = [
    {
      title: 'Service Usage',
      icon: <FaFileContract className="w-6 h-6" />,
      content: `By using our IPv6 testing and educational services, you agree to:
      • Use the services for legitimate IPv6 testing and learning
      • Provide accurate information when using our tools
      • Not attempt to manipulate or abuse the testing systems
      • Respect the privacy and security of other users
      
      We reserve the right to limit or terminate access for misuse.`
    },
    {
      title: 'User Responsibilities',
      icon: <FaUserCheck className="w-6 h-6" />,
      content: `As a user of our services, you are responsible for:
      • Maintaining the security of your account
      • Ensuring your network configurations are legal
      • Reporting any security vulnerabilities
      • Using IPv6 testing tools responsibly
      
      You must comply with all applicable laws and regulations.`
    },
    {
      title: 'Service Limitations',
      icon: <FaTools className="w-6 h-6" />,
      content: `Our IPv6 services are provided "as is" with:
      • No guarantee of 100% uptime
      • Limited support for legacy systems
      • Standard testing capabilities
      • Basic educational resources
      
      We continuously work to improve our services.`
    },
    {
      title: 'Disclaimer',
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      content: `We are not responsible for:
      • Network issues beyond our control
      • Results of IPv6 testing on your systems
      • Third-party service disruptions
      • Data loss during testing
      
      Always backup your data before testing.`
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
              Terms of <span className="text-[#00C389]">Service</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-[#1A1E26] dark:text-white">Welcome to IPv6 Awareness</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These Terms of Service govern your use of our IPv6 testing and educational services. By accessing or using our services, you agree to be bound by these terms.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our services are designed to help users understand, test, and implement IPv6 in their networks. We provide tools, resources, and educational content to support IPv6 adoption.
              </p>
            </motion.div>

            {/* Terms Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#00C389]/10 flex items-center justify-center">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A1E26] dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#1A1E26] dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For any questions about these Terms of Service, please contact us at:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Email: contact@ipv6et.org
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Address: Addis Ababa, Ethiopia
                </p>
              </div>
            </motion.div>

            {/* Last Updated */}
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsOfService; 