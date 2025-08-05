import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PlusIcon, PencilIcon, TrashIcon, CalendarIcon, ClockIcon, MapPinIcon, LinkIcon, TagIcon, PhotoIcon, DocumentTextIcon, QueueListIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import DeleteConfirmation from '../components/DeleteConfirmation';
import EditModal from '../components/EditModal';

// Custom CSS for date picker colors
const datePickerStyles = `
  .date-picker-black::-webkit-calendar-picker-indicator {
    filter: brightness(0) !important;
  }
  .dark .date-picker-black::-webkit-calendar-picker-indicator {
    filter: brightness(1) !important;
  }
`;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    event_type: 'conference',
    event_date: '',
    event_time: '',
    location: '',
    link: '',
    tags: [], // Ensure this is always initialized as an array
    image_url: ''
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const eventTypes = [
    { value: 'conference', label: 'Conference' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'workshop', label: 'Workshop' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true); // Start loading state
      const { data, error } = await supabase
        .from('ipv6_events')
        .select('*')
        .order('event_date', { ascending: true });
      if (error) throw error;
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Error fetching events: ' + error.message);
    } finally {
      setLoading(false); // End loading state
    }
  };

  async function handleFileUpload(event) {
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

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Show uploading toast
      const uploadToast = toast.loading('Uploading image...');

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error(`Failed to upload image: ${uploadError.message}`, { id: uploadToast });
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      
      // Show success toast
      toast.success('Image uploaded successfully', { id: uploadToast });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check authentication first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        toast.error('Please log in to create or update events');
        return;
      }

      if (selectedEvent) {
        const { error } = await supabase
          .from('ipv6_events')
          .update(formData)
          .eq('id', selectedEvent.id);
        if (error) throw error;
        toast.success('Event updated successfully');
      } else {
        const { error } = await supabase
          .from('ipv6_events')
          .insert([formData]);
        if (error) throw error;
        toast.success('Event created successfully');
      }
      setFormData({
        title: '',
        short_description: '',
        full_description: '',
        event_type: 'conference',
        event_date: '',
        event_time: '',
        location: '',
        link: '',
        tags: [], // Reset to empty array
        image_url: ''
      });
      setIsFormOpen(false); // Close form after submission
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Error creating event: ' + error.message);
    }
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;
    
    try {
      const { error } = await supabase
        .from('ipv6_events')
        .delete()
        .eq('id', eventToDelete.id);
      
      if (error) throw error;
      
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  const handleUpdate = (event) => {
    // Note: Authentication check for update is done in handleSubmit
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      short_description: event.short_description,
      full_description: event.full_description,
      event_type: event.event_type,
      event_date: event.event_date,
      event_time: event.event_time,
      location: event.location,
      link: event.link,
      // Ensure tags is always an array or an empty string for the input field
      tags: Array.isArray(event.tags) ? event.tags : [], 
      image_url: event.image_url
    });
    setIsFormOpen(true); // Open form for editing
  };

  const handleEdit = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };

  const handleSave = (updatedData) => {
    // Your logic to save the edited data
    setEditModalOpen(false);
    // Optionally refresh data or show a success message
  };

  return (
    <div className="space-y-6 p-6">
      <style>{datePickerStyles}</style>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Events
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
            Manage your upcoming and past events
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedEvent(null); // Clear selected event for new form
            setFormData({ // Reset form data for new event
              title: '',
              short_description: '',
              full_description: '',
              event_type: 'conference',
              event_date: '',
              event_time: '',
              location: '',
              link: '',
              tags: [],
              image_url: ''
            });
            setIsFormOpen(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-box-bg dark:bg-box-bg-dark rounded-xl shadow-lg p-6 border border-gray-100 dark:border-dark-border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {selectedEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          {/* Form uses handleSubmit for both create and update */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Short Description
              </label>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Full Description
              </label>
              <textarea
                name="full_description"
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                rows="5"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Event Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <QueueListIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Event Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors date-picker-black"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Event Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ClockIcon className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <input
                    type="time"
                    name="event_time"
                    value={formData.event_time}
                    onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                    className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:dark:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:dark:brightness-100"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="e.g., Online, Convention Center"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Event Link
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="https://eventwebsite.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Tags (comma-separated)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="tags"
                  // FIX: Ensure formData.tags is an array before calling .join()
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                  className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="e.g., security, networking, webinar"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Image Upload
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-dark-border border-dashed rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
                <div className="space-y-1 text-center">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Event" className="mx-auto h-32 w-auto object-cover rounded-md mb-2" />
                  ) : (
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-dark-text-secondary">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white dark:bg-dark-bg-tertiary rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className={`btn btn-primary ${
                  (loading || uploading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {selectedEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="text-center text-gray-500 dark:text-dark-text-secondary">
          <p>Loading events...</p>
        </div>
      )}

      {!loading && events.length === 0 ? (
        <p className="text-gray-500 dark:text-dark-text-secondary">No events found. Add a new event to get started.</p>
      ) : (
        <div className="bg-box-bg dark:bg-box-bg-dark rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-dark-border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              All Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md overflow-hidden flex flex-col">
                  {event.image_url && (
                    <div className="relative w-full h-48">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm mb-2 line-clamp-2">
                      {event.short_description}
                    </p>
                    <div className="text-gray-500 dark:text-dark-text-secondary text-xs space-y-1">
                      <p className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(event.event_date).toLocaleDateString()} at {event.event_time}
                      </p>
                      {event.location && (
                        <p className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {event.location}
                        </p>
                      )}
                      {event.link && (
                        <p className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-1" />
                          <a href={event.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            View Event
                          </a>
                        </p>
                      )}
                      <p className="flex items-center">
                        <QueueListIcon className="h-4 w-4 mr-1" />
                        Type: {event.event_type}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {/* Ensure event.tags is an array before mapping */}
                      {Array.isArray(event.tags) && event.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 dark:bg-dark-border text-gray-700 dark:text-dark-text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-dark-bg-tertiary flex justify-end space-x-2">
                    <button
                      onClick={() => handleUpdate(event)} // Pass the whole event object
                      className="text-primary hover:text-primary-dark"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(event)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EditModal
          data={editData}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
