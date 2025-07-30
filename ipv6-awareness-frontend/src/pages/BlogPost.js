import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { UserIcon, CalendarIcon, DocumentIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static press release post
  const pressReleasePost = {
    id: 'press-release-ethiopia-ipv6-council',
    title: 'Ethiopia IPv6 Council Has Been Founded',
    short_description: 'The IPv6 Forum welcomes the formation of a new IPv6 initiative with the establishment of the Ethiopia IPv6 Council under the leadership of Dr. Zelalem Wudeneh Mengistu.',
    full_description: `
      <h2>Press Release</h2>
      <h3>Ethiopia IPv6 Council Has Been Founded</h3>
      <p><strong>Addis Ababa/Luxembourg, 29.7, 2025</strong> - The IPv6 Forum welcomes the formation of a new IPv6 initiative with the establishment of the Ethiopia IPv6 Council under the leadership of Dr. Zelalem Wudeneh Mengistu.</p>
      
      <blockquote>
        "The Ethiopia IPv6 Council will invite key stakeholders from government, industry and academia from Central Asia to work jointly on the Ethiopia IPv6 roadmap milestones with collaborative vision for Ethiopia and Central Asia to focus its efforts to achieve the adoption the New Internet world based on IPv6" stated Dr. Zelalem, President, Ethiopia IPv6 Council
      </blockquote>
      
      <p>The prime objective of the Ethiopia IPv6 Council and its members is to promote deployment and coordinated uptake of the Internet Protocol version 6 (IPv6) with support from industry, education, research communities and government agencies enabling equitable access to technology and knowledge.</p>
      
      <blockquote>
        "The Ethiopia IPv6 Council has been created to extend to the Uzbekistan Internet community a strong voice and representation in the new Internet world to create momentum in deploying IPv6 and gradually sunset IPv4," stated Latif Ladid, IPv6 Forum, Founder & President.
      </blockquote>
      
      <h4>About the Ethiopia IPv6 Council</h4>
      <p>The Ethiopia IPv6 Council is a chapter of the IPv6 Forum dedicated to the advancement and promotion of IPv6 best practices and lessons learned. Comprised of individual members, as opposed to corporate sponsors, its mission is to provide technical leadership and innovative thought for the successful integration of IPv6 into all facets of networking and telecommunications infrastructure, present and future.</p>
      
      <p>The Ethiopia Council collaborates within the IPv6 Forum with other national based councils in creating a peer reviewed compendium of recommended IPv6 specific standards and deployment best practices.</p>
      
      <hr>
      <p><strong>Organization Contact:</strong><br>
      President: Dr. Zelalem</p>
    `,
    author: 'IPv6 Forum',
    published_on: '2025-07-29',
    category: 'News',
    image_url: null
  };

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  async function fetchBlogPost() {
    try {
      // Check if it's the static press release post
      if (id === 'press-release-ethiopia-ipv6-council') {
        setPost(pressReleasePost);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('ipv6_blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = () => {
    if (post?.file_url) {
      const link = document.createElement('a');
      link.href = post.file_url;
      link.download = '';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg-primary pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00C389]"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg-primary pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Error</h3>
            <p>{error || 'Blog post not found'}</p>
            <button
              onClick={() => navigate('/blog')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg-primary pt-24">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center text-[#00C389] hover:text-[#00C389]/90 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Blog
        </button>

        <article className="max-w-4xl mx-auto">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl mb-8"
            />
          )}

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {new Date(post.published_on).toLocaleDateString()}
            </div>
            {post.file_url && (
              <button
                onClick={handleDownload}
                className="flex items-center text-[#00C389] hover:text-[#00C389]/90"
              >
                <DocumentIcon className="h-5 w-5 mr-2" />
                Download File
              </button>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {post.short_description}
            </p>
            <div 
              className="text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.full_description }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost; 