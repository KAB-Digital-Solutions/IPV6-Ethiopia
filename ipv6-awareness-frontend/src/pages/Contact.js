// === src/pages/Contact.js ===
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaFacebookF } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('ipv6_contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            submitted_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to send message');

      }

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);

      toast.error(error.message || 'Failed to send message. Please try again.');

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[25vh] sm:min-h-[30vh] flex items-center justify-center bg-white dark:bg-dark-bg-primary overflow-hidden">
        {/* Background gradients and bulbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 left-[60%] w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-16 right-10 w-48 h-48 bg-secondary/30 rounded-full blur-[60px]"></div>
          <div className="absolute inset-0 dark:hero-pattern mix-blend-soft-light"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-black dark:text-white">
              Contact <span className="text-[#00C389]">Us</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              We'd love to hear from you. Reach out with any questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-dark-bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2">
                  Get in <span className="text-[#00C389]">Touch</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Whether you're curious about features or want support—we're ready to answer any and all questions.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00C389]/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-lg sm:text-xl text-[#00C389]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-0.5">Email</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">contact@ipv6et.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00C389]/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-lg sm:text-xl text-[#00C389]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-0.5">Phone</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">+251-911-677-096</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00C389]/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-lg sm:text-xl text-[#00C389]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-0.5">Location</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/groups/13348117/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#00C389]/10 flex items-center justify-center text-[#00C389] hover:bg-[#00C389] hover:text-white transition" aria-label="LinkedIn">
                    <FaLinkedin className="text-base sm:text-lg" />
                  </a>
                  <a href="https://web.facebook.com/people/IP-Ethiopia/pfbid0KzrtjAg2agW1PiiTGF8fvswwLsLvXpWZ7VEMqGuwpBgKYi9ARn7tAjtQUnSCD4Fml/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#00C389]/10 flex items-center justify-center text-[#00C389] hover:bg-[#00C389] hover:text-white transition" aria-label="Facebook">
                    <FaFacebookF className="text-base sm:text-lg" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg-tertiary text-black dark:text-white focus:ring-2 focus:ring-[#00C389] focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg-tertiary text-black dark:text-white focus:ring-2 focus:ring-[#00C389] focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg-tertiary text-black dark:text-white focus:ring-2 focus:ring-[#00C389] focus:outline-none text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg-tertiary text-black dark:text-white focus:ring-2 focus:ring-[#00C389] focus:outline-none resize-none text-sm sm:text-base"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-[#00C389] text-white rounded-lg hover:bg-[#00C389]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaArrowRight className="text-sm sm:text-base" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
