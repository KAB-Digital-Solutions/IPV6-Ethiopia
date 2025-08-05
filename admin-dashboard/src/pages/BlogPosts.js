import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon, CalendarIcon, UserIcon, TagIcon, BookOpenIcon, QueueListIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import DeleteConfirmation from '../components/DeleteConfirmation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Custom CSS for date picker colors
const datePickerStyles = `
  .date-picker-black::-webkit-calendar-picker-indicator {
    filter: brightness(0) !important;
  }
  .dark .date-picker-black::-webkit-calendar-picker-indicator {
    filter: brightness(1) !important;
  }
`;

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    image_url: '',
    file_url: '',
    category: '',
    author: 'Admin',
    published_on: new Date().toISOString().split('T')[0],
    read_time: '5 min read'
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const quillRef = useRef(null);

  const categories = ['news', 'tutorials', 'case-studies'];

  useEffect(() => {
    fetchPosts();
    // Test database connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('ipv6_blog_posts')
          .select('count')
          .limit(1);
        
        if (error) {
          console.error('Database connection test failed:', error);
        } else {
          console.log('Database connection successful');
        }
      } catch (error) {
        console.error('Connection test failed:', error);
      }
    };
    
    testConnection();
    
    // Test insert functionality
    const testInsert = async () => {
      try {
        const testData = {
          title: 'Test Post',
          short_description: 'Test description',
          full_description: '<p>Test content</p>',
          category: 'news',
          author: 'Admin',
          published_on: new Date().toISOString().split('T')[0],
          read_time: '5 min read'
        };
        
        const { data, error } = await supabase
          .from('ipv6_blog_posts')
          .insert([testData])
          .select();
        
        if (error) {
          console.error('Test insert failed:', error);
        } else {
          console.log('Test insert successful:', data);
          // Clean up test data
          if (data && data[0]) {
            await supabase
              .from('ipv6_blog_posts')
              .delete()
              .eq('id', data[0].id);
          }
        }
      } catch (error) {
        console.error('Test insert error:', error);
      }
    };
    
    // Uncomment the line below to test insert functionality
    // testInsert();
  }, []);

  // Monitor form data changes
  useEffect(() => {
    console.log('Form data changed:', formData); // Debug log
    console.log('Full description in form:', formData.full_description); // Debug log
  }, [formData]);

  // Monitor form open state
  useEffect(() => {
    if (isFormOpen && selectedPost) {
      console.log('Form opened for editing:', selectedPost); // Debug log
      console.log('Selected post full_description:', selectedPost.full_description); // Debug log
    }
  }, [isFormOpen, selectedPost]);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching blog posts...'); // Debug log
      const { data, error } = await supabase
        .from('ipv6_blog_posts')
        .select('*')
        .order('published_on', { ascending: false });

      if (error) {
        console.error('Supabase error fetching posts:', error); // Debug log
        throw error;
      }
      console.log('Fetched posts:', data); // Debug log
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event, type) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      console.log('Uploading file:', file.name, 'Type:', type); // Debug log

      // Check authentication first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error('Authentication error:', sessionError); // Debug log
        toast.error('Please log in to upload files');
        return;
      }
      
      console.log('User authenticated:', session.user.id); // Debug log

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Determine which bucket to use based on type
      const bucket = type === 'image' ? 'blog-images' : 'blog-files';

      // Show uploading toast
      const uploadToast = toast.loading(`Uploading ${type}...`);

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error(`Failed to upload ${type}: ${uploadError.message}`, { id: uploadToast });
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (type === 'image') {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, file_url: publicUrl }));
      }

      // Show success toast
      toast.success(`${type === 'image' ? 'Image' : 'File'} uploaded successfully`, { id: uploadToast });
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData); // Debug log
      
      // Check authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error('Authentication error:', sessionError); // Debug log
        toast.error('Please log in to create blog posts');
        return;
      }
      
      console.log('User authenticated:', session.user.id); // Debug log
      
      // Validate required fields
      if (!formData.title || formData.title.trim() === '') {
        throw new Error('Please enter a title');
      }
      if (!formData.short_description || formData.short_description.trim() === '') {
        throw new Error('Please enter a short description');
      }
      if (!formData.full_description || formData.full_description.trim() === '' || formData.full_description === '<p><br></p>') {
        throw new Error('Please enter the full description');
      }
      if (!formData.image_url) {
        throw new Error('Please upload an image');
      }
      if (!formData.category || !categories.includes(formData.category)) {
        throw new Error('Please select a valid category');
      }

      // Log the exact data being sent
      console.log('Data to insert:', JSON.stringify(formData, null, 2)); // Debug log
      console.log('Full description length:', formData.full_description?.length); // Debug log
      console.log('Full description preview:', formData.full_description?.substring(0, 100)); // Debug log
      
      const { data, error } = await supabase
        .from('ipv6_blog_posts')
        .insert([formData])
        .select();

      if (error) {
        console.error('Supabase error:', error); // Debug log
        console.error('Error details:', error.details); // Debug log
        console.error('Error hint:', error.hint); // Debug log
        throw error;
      }
      
      console.log('Insert successful:', data); // Debug log

      toast.success('Blog post created successfully');
      setFormData({
        title: '',
        short_description: '',
        full_description: '',
        image_url: '',
        file_url: '',
        category: '',
        author: 'Admin',
        published_on: new Date().toISOString().split('T')[0],
        read_time: '5 min read'
      });
      fetchPosts();
      setIsFormOpen(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error(error.message || 'Failed to create blog post');
    }
  }

  async function handleUpdate(postData) {
    try {
      console.log('=== UPDATE OPERATION START ==='); // Debug log
      console.log('Updating blog post with data:', postData); // Debug log
      console.log('Full description in postData:', postData.full_description); // Debug log
      console.log('Full description length:', postData.full_description?.length); // Debug log
      
      // Check authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error('Authentication error:', sessionError); // Debug log
        toast.error('Please log in to update blog posts');
        return;
      }
      
      console.log('User authenticated:', session.user.id); // Debug log
      
      // Validate required fields
      if (!postData.title || postData.title.trim() === '') {
        throw new Error('Please enter a title');
      }
      if (!postData.short_description || postData.short_description.trim() === '') {
        throw new Error('Please enter a short description');
      }
      if (!postData.full_description || postData.full_description.trim() === '' || postData.full_description === '<p><br></p>') {
        console.error('Full description validation failed:', postData.full_description); // Debug log
        throw new Error('Please enter the full description');
      }
      if (!postData.image_url) {
        throw new Error('Please upload an image');
      }
      if (!postData.category || !categories.includes(postData.category)) {
        throw new Error('Please select a valid category');
      }

      const { id, ...updates } = postData;
      
      // Log the exact data being sent
      console.log('Data to update:', JSON.stringify(updates, null, 2)); // Debug log
      console.log('Full description length:', updates.full_description?.length); // Debug log
      console.log('Full description preview:', updates.full_description?.substring(0, 100)); // Debug log
      
      const { data, error } = await supabase
        .from('ipv6_blog_posts')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase update error:', error); // Debug log
        console.error('Error details:', error.details); // Debug log
        console.error('Error hint:', error.hint); // Debug log
        throw error;
      }
      
      console.log('Update successful:', data); // Debug log

      toast.success('Blog post updated successfully');
      setIsFormOpen(false);
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error(error.message || 'Failed to update blog post');
    }
  }

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      const { error } = await supabase
        .from('ipv6_blog_posts')
        .delete()
        .eq('id', postToDelete.id);

      if (error) throw error;
      
      toast.success('Blog post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    } finally {
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <style>{datePickerStyles}</style>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Posts
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
            Manage your blog content and create new posts
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedPost(null);
            setIsFormOpen(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Blog Post
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-box-bg dark:bg-box-bg-dark rounded-xl shadow-lg p-6 border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted - current formData:', formData); // Debug log
            console.log('Full description before submission:', formData.full_description); // Debug log
            
            if (selectedPost) {
              const updateData = { ...formData, id: selectedPost.id };
              console.log('Update data prepared:', updateData); // Debug log
              handleUpdate(updateData);
            } else {
              handleSubmit(e);
            }
          }} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Short Description
              </label>
              <textarea
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Full Description
              </label>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-2">
                Use the rich text editor below to format your content with headings, bullets, bold text, and more.
              </p>
              <div className="border border-gray-300 dark:border-dark-border rounded-lg overflow-hidden [&_.ql-toolbar]:bg-gray-50 dark:[&_.ql-toolbar]:bg-gray-700 [&_.ql-toolbar]:border-gray-300 dark:[&_.ql-toolbar]:border-gray-600 [&_.ql-container]:border-gray-300 dark:[&_.ql-container]:border-gray-600 [&_.ql-editor]:bg-white dark:[&_.ql-editor]:bg-gray-800 [&_.ql-editor]:text-gray-900 dark:[&_.ql-editor]:text-gray-100 [&_.ql-toolbar_button]:text-gray-600 dark:[&_.ql-toolbar_button]:text-gray-300 [&_.ql-toolbar_button:hover]:text-gray-900 dark:[&_.ql-toolbar_button:hover]:text-white [&_.ql-active]:text-[#00C389] [&_.ql-stroke]:stroke-gray-600 dark:[&_.ql-stroke]:stroke-gray-300 [&_.ql-fill]:fill-gray-600 dark:[&_.ql-fill]:fill-gray-300">
                <ReactQuill
                  ref={quillRef}
                  key={selectedPost ? `edit-${selectedPost.id}` : 'new-post'}
                  value={formData.full_description || ''}
                  onChange={(value) => {
                    console.log('ReactQuill onChange triggered'); // Debug log
                    console.log('New value:', value); // Debug log
                    console.log('Value length:', value?.length); // Debug log
                    console.log('Value preview:', value?.substring(0, 100)); // Debug log
                    setFormData(prev => {
                      const newData = { ...prev, full_description: value };
                      console.log('Updated formData:', newData); // Debug log
                      return newData;
                    });
                  }}
                  onBlur={() => {
                    console.log('ReactQuill onBlur - final value:', formData.full_description); // Debug log
                  }}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'align': [] }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                  placeholder="Write your blog content here..."
                  style={{ minHeight: '200px' }}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Image Upload (Required)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
                <div className="space-y-1 text-center">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Blog Post" className="mx-auto h-32 w-auto object-cover rounded-md mb-2" />
                  ) : (
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-dark-text-secondary">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                      <span>Upload an image</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        required={!formData.image_url}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                File Upload (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
                <div className="space-y-1 text-center">
                  {formData.file_url ? (
                    <div className="flex items-center justify-center">
                      <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                        File uploaded
                      </span>
                    </div>
                  ) : (
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-dark-text-secondary">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleFileUpload(e, 'file')}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Author
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Published Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                </div>
                <input
                  type="date"
                  value={formData.published_on}
                  onChange={(e) => setFormData({ ...formData, published_on: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors date-picker-black"
                  required
                />
              </div>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Read Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpenIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="e.g., 5 min read"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setSelectedPost(null);
                  setFormData({
                    title: '',
                    short_description: '',
                    full_description: '',
                    image_url: '',
                    file_url: '',
                    category: '',
                    author: 'Admin',
                    published_on: new Date().toISOString().split('T')[0],
                    read_time: '5 min read'
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className={`btn btn-primary ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? 'Uploading...' : selectedPost ? 'Update Blog Post' : 'Create Blog Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-box-bg dark:bg-box-bg-dark rounded-xl shadow-lg p-6 border border-gray-100 dark:border-dark-border"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                  {post.category}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    console.log('Editing post:', post); // Debug log
                    console.log('Post full_description:', post.full_description); // Debug log
                    setSelectedPost(post);
                    setFormData(post);
                    setIsFormOpen(true);
                    
                    // Force ReactQuill to reinitialize after a short delay
                    setTimeout(() => {
                      console.log('Form data after delay:', formData); // Debug log
                      console.log('Selected post full_description:', post.full_description); // Debug log
                    }, 100);
                  }}
                  className="p-2 text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(post)}
                  className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
              {post.short_description}
            </p>

            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-text-secondary">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {new Date(post.published_on).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary flex items-center">
              <BookOpenIcon className="h-4 w-4 mr-1" />
              {post.read_time}
            </div>

            {post.file_url && (
              <a
                href={post.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center text-primary hover:text-primary-dark"
              >
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                Download File
              </a>
            )}
          </div>
        ))}
      </div>

      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPostToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${postToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

export default BlogPosts; 