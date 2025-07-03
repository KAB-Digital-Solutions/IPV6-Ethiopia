import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  CalendarIcon,
  DocumentTextIcon,
  BookOpenIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Resources', href: '/resources', icon: DocumentTextIcon },
  { name: 'Blog Posts', href: '/blog-posts', icon: BookOpenIcon },
  { name: 'Contact Messages', href: '/contact-messages', icon: EnvelopeIcon },
];

function Sidebar({ session, onClose }) {
  const location = useLocation();
  const userEmail = session?.user?.email || 'admin@example.com';

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-dark-border">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Logo and Tagline */}
      <div className="flex flex-col items-center justify-center h-24 px-4 border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center space-x-2">
          <img
            src="/admin/logo.jpg"
            alt="Logo"
            className="h-14 sm:h-16 w-auto"
          />
          <div className="flex items-center">
            <span className="text-sm sm:text-base font-bold text-black dark:text-white">
              <span className="text-[#00b741]">IPv6</span>{' '}
              <span className="text-[#c99a06]">ETHIOPIA</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-dark-text-secondary hover:bg-[#009C6B] hover:text-white dark:hover:bg-[#009C6B]'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {userEmail.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-dark-text-primary truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 