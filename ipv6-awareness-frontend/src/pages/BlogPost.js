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

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  async function fetchBlogPost() {
    try {
      console.log('Fetching blog post with ID:', id); // Debug log
      const { data, error } = await supabase
        .from('ipv6_blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error); // Debug log
        throw error;
      }
      
      console.log('Fetched blog post:', data); // Debug log
      console.log('Full description from database:', data?.full_description); // Debug log
      console.log('Full description length:', data?.full_description?.length); // Debug log
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
            {post.full_description ? (
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 dark:[&>h1]:text-white [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:text-gray-900 dark:[&>h2]:text-white [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-900 dark:[&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-3 [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-gray-900 dark:[&>h4]:text-white [&>h4]:mt-4 [&>h4]:mb-2 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul]:mb-6 [&>ul]:pl-8 [&>ol]:mb-6 [&>ol]:pl-8 [&>li]:mb-2 [&>li]:leading-relaxed [&>ul>li]:list-disc [&>ol>li]:list-decimal [&>blockquote]:border-l-4 [&>blockquote]:border-[#00C389] [&>blockquote]:pl-4 [&>blockquote]:my-8 [&>blockquote]:italic [&>blockquote]:text-gray-600 dark:[&>blockquote]:text-gray-400 [&>a]:text-[#00C389] [&>a]:underline [&>a:hover]:text-[#00a676] [&>strong]:font-semibold [&>em]:italic [&>code]:bg-gray-100 dark:[&>code]:bg-gray-700 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-100 dark:[&>pre]:bg-gray-700 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6 [&>img]:max-w-full [&>img]:h-auto [&>img]:rounded-lg [&>img]:my-6 [&>table]:w-full [&>table]:border-collapse [&>table]:my-6 [&>th]:border [&>th]:border-gray-300 dark:[&>th]:border-gray-600 [&>th]:p-3 [&>th]:text-left [&>th]:bg-gray-50 dark:[&>th]:bg-gray-700 [&>th]:font-semibold [&>td]:border [&>td]:border-gray-300 dark:[&>td]:border-gray-600 [&>td]:p-3 [&>td]:text-left"
                dangerouslySetInnerHTML={{ __html: post.full_description }}
              />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No content available for this blog post.
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost; 