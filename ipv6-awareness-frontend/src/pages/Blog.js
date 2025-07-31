// === src/pages/Blog.js ===
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { UserIcon, CalendarIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('All');
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  async function fetchBlogPosts() {
    try {
      const { data, error } = await supabase
        .from('ipv6_blog_posts')
        .select('*')
        .order('published_on', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = (e, post) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.file_url) {
      const link = document.createElement('a');
      link.href = post.file_url;
      link.download = '';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const featuredPosts = posts.slice(0, 3);
  const baseCategories = ['All', 'News', 'Tutorials', 'Case-Studies'];
  const tabs = baseCategories;

  const filteredPosts =
    selectedTab === 'All'
      ? posts
      : posts.filter(post => post.category?.toLowerCase() === selectedTab.toLowerCase());

  const CustomArrow = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-all
        ${direction === 'left' ? 'left-2' : 'right-2'}
        bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-[#00C389]/20`}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      {direction === 'left' ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    className: 'rounded-xl shadow-lg',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg-primary pt-24 text-black dark:text-white">
      <div className="container mx-auto px-4 py-12">

        {/* Carousel */}
        <section className="max-w-5xl mx-auto mb-16 relative">
          <Slider {...sliderSettings}>
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="relative group rounded-xl overflow-hidden shadow-xl h-96"
              >
                <div
                  className="absolute inset-0 blur-md scale-110"
                  style={{
                    backgroundImage: `url(${post.image_url || ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px) brightness(0.7)',
                    zIndex: 1,
                  }}
                />
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-contain z-10 mx-auto my-auto"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center z-10">
                    <DocumentIcon className="h-24 w-24 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6 z-20">
                  <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                      Find the <span style={{ color: '#00C389' }}>Latest Blogs</span>
                    </h1>
                    <p className="text-2xl font-medium text-gray-200">
                      Learn everything about <span style={{ color: '#00C389' }}>IPv6</span> from tutorials, news, and expert case studies
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all
                ${selectedTab === tab
                  ? 'bg-[#00C389] text-black font-medium shadow-sm'
                  : 'bg-white/10 text-white border border-white/20 hover:border-[#00C389]'}`}
            >
              <span className={`text-sm font-medium ${selectedTab === tab ? 'text-black' : 'text-[#00C389]'}`}>{tab}</span>
            </button>
          ))}
        </div>

        {/* Blog posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                  {post.short_description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(post.published_on).toLocaleDateString()}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-[#00C389] font-medium">
                    Read more
                  </span>
                  {post.file_url && (
                    <button
                      onClick={(e) => handleDownload(e, post)}
                      className="flex items-center text-[#00C389] hover:text-[#00C389]/90"
                    >
                      <DocumentIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm">Download</span>
                  </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
