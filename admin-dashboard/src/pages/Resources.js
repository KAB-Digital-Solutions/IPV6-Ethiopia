import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon, DocumentTextIcon, TagIcon, LinkIcon, UserIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import DeleteConfirmation from '../components/DeleteConfirmation';

// Custom CSS for date picker colors
const datePickerStyles = `
  .date-picker-black::-webkit-calendar-picker-indicator {
    filter: brightness(0) !important;
  }
  .dark .date-picker-black::-webkit-calendar-picker-indicator {
    filter: brightness(1) !important;
  }
`;

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    url: '',
    image_url: '',
    file_url: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    rating: 0,
    downloads: 0,
    author: 'Admin'
  });
  const [selectedResource, setSelectedResource] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);

  const categories = ['documentation', 'tutorials', 'tools'];

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ipv6_resources')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        throw error;
      }
      
      console.log('Fetched resources:', data); // Debug log
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event, type) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      // Check authentication first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        toast.error('Please log in to upload files');
        return;
      }

      // Log file details for debugging
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      // Remove the public/ prefix from the file path
      const filePath = fileName;

      // Determine which bucket to use based on type
      const bucket = type === 'image' ? 'resource-images' : 'resource-files';
      console.log('Using bucket:', bucket);

      // Show uploading toast
      const uploadToast = toast.loading(`Uploading ${type}...`);

      // Upload file to storage with explicit options
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error details:', {
          message: uploadError.message,
          statusCode: uploadError.statusCode,
          error: uploadError.error,
          details: uploadError.details
        });
        toast.error(`Failed to upload ${type}: ${uploadError.message}`, { id: uploadToast });
        throw uploadError;
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      if (type === 'image') {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, file_url: publicUrl }));
      }

      // Show success toast
      toast.success(`${type === 'image' ? 'Image' : 'File'} uploaded successfully`, { id: uploadToast });
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        statusCode: error.statusCode,
        error: error.error,
        details: error.details
      });
      toast.error(`Failed to upload ${type}: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.title) {
        throw new Error('Title is required');
      }
      if (!formData.category || !categories.includes(formData.category)) {
        throw new Error('Please select a valid category');
      }

      const resourceData = {
        ...formData,
        tags: formData.tags,
        rating: 0,
        downloads: 0,
        date: new Date().toISOString().split('T')[0]
      };

      console.log('Submitting resource:', resourceData); // Debug log

      const { data, error } = await supabase
        .from('ipv6_resources')
        .insert([resourceData])
        .select();

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }

      console.log('Created resource:', data); // Debug log
      toast.success('Resource created successfully');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        url: '',
        image_url: '',
        file_url: '',
        tags: [],
        date: new Date().toISOString().split('T')[0],
        rating: 0,
        downloads: 0,
        author: 'Admin'
      });
      setTagInput('');
      
      // Fetch updated list
      await fetchResources();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating resource:', error);
      toast.error(error.message || 'Failed to create resource');
    }
  }

  async function handleUpdate(resourceData) {
    try {
      const { id, ...updates } = resourceData;
      const { error } = await supabase
        .from('ipv6_resources')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Resource updated successfully');
      setIsFormOpen(false);
      setSelectedResource(null);
      fetchResources();
    } catch (error) {
      console.error('Error updating resource:', error);
      toast.error(error.message || 'Failed to update resource');
    }
  }

  const handleDeleteClick = (resource) => {
    setResourceToDelete(resource);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!resourceToDelete) return;

    try {
      const { error } = await supabase
        .from('ipv6_resources')
        .delete()
        .eq('id', resourceToDelete.id);

      if (error) throw error;
      
      toast.success('Resource deleted successfully');
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    } finally {
      setDeleteModalOpen(false);
      setResourceToDelete(null);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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
            Resources
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
            Manage educational resources and tools
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedResource(null);
            setIsFormOpen(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Resource
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-box-bg dark:bg-box-bg-dark rounded-xl shadow-lg p-6 border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {selectedResource ? 'Edit Resource' : 'Create New Resource'}
          </h2>
          <form onSubmit={selectedResource ? (e) => handleUpdate({ ...formData, id: selectedResource.id }) : handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Title (Required)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Category (Required)
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

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="e.g., PDF, Video, Tool"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Image Upload
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
                <div className="space-y-1 text-center">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Resource" className="mx-auto max-h-32 w-auto object-contain rounded-md mb-2" />
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
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                File Upload
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

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Tags
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-primary hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </span>
                ))}
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
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-white" />
                </div>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors date-picker-black"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className={`btn btn-primary ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? 'Uploading...' : selectedResource ? 'Update Resource' : 'Create Resource'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-box-bg dark:bg-box-bg-dark rounded-xl shadow-lg p-0 border border-gray-100 dark:border-dark-border"
          >
            {resource.image_url && (
              <img
                src={resource.image_url}
                alt={resource.title}
                className="w-full h-48 object-contain rounded-lg block"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                    {resource.category}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedResource(resource);
                      setFormData(resource);
                      setIsFormOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(resource)}
                    className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags && resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-text-secondary">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {resource.author}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(resource.date).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end">
                {resource.file_url && (
                  <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary-dark"
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-1" />
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setResourceToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Resource"
        message={`Are you sure you want to delete "${resourceToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

export default Resources;