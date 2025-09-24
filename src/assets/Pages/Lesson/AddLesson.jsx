import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  RiBookOpenLine, 
  RiFileTextLine, 
  RiVideoLine,
  RiMoneyDollarCircleLine,
  RiGraduationCapLine,
  RiSaveLine,
  RiArrowLeftLine,
  RiErrorWarningFill,
  RiCheckLine
} from "@remixicon/react";

const AddLesson = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    classLevel: '',
    price: '',
    isPaid: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const classLevels = [
    { value: 'grade-1', label: 'Grade 1' },
    { value: 'grade-2', label: 'Grade 2' },
    { value: 'grade-3', label: 'Grade 3' },
    { value: 'grade-4', label: 'Grade 4' },
    { value: 'grade-5', label: 'Grade 5' },
    { value: 'grade-6', label: 'Grade 6' },
    { value: 'grade-7', label: 'Grade 7' },
    { value: 'grade-8', label: 'Grade 8' },
    { value: 'grade-9', label: 'Grade 9' },
    { value: 'grade-10', label: 'Grade 10' },
    { value: 'grade-11', label: 'Grade 11' },
    { value: 'grade-12', label: 'Grade 12' },
    { value: 'university', label: 'University' },
    { value: 'professional', label: 'Professional' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.videoUrl.trim()) {
      setError('Video URL is required');
      return;
    }
    if (!formData.classLevel) {
      setError('Class level is required');
      return;
    }
    if (formData.isPaid && (!formData.price || formData.price <= 0)) {
      setError('Price is required for paid lessons');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const lessonData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        videoUrl: formData.videoUrl.trim(),
        classLevel: formData.classLevel,
        price: formData.isPaid ? parseFloat(formData.price) : 0,
        isPaid: formData.isPaid
      };

      await axios.post('https://edu-master-psi.vercel.app/lesson', lessonData, {
        headers: { token }
      });

      navigate('/lessons');
      alert('Lesson created successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create lesson');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header */}
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/lessons')}
              className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
            >
              <RiArrowLeftLine className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">Create New Lesson</h1>
              <p className="text-grey-15/70">Add a new educational lesson with video content and pricing options.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <RiErrorWarningFill className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-grey-15 mb-6 flex items-center gap-2">
                  <RiBookOpenLine className="w-6 h-6 text-orange-50" />
                  Basic Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-grey-15 mb-2">
                      Lesson Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15"
                      placeholder="Enter lesson title"
                      required
                    />
                  </div>

                  {/* Class Level */}
                  <div>
                    <label htmlFor="classLevel" className="block text-sm font-medium text-grey-15 mb-2">
                      Class Level *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiGraduationCapLine className="w-5 h-5 text-grey-15/40" />
                      </div>
                      <select
                        id="classLevel"
                        name="classLevel"
                        value={formData.classLevel}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 bg-white"
                        required
                      >
                        <option value="">Select class level</option>
                        {classLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Video URL */}
                  <div>
                    <label htmlFor="videoUrl" className="block text-sm font-medium text-grey-15 mb-2">
                      Video URL *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiVideoLine className="w-5 h-5 text-grey-15/40" />
                      </div>
                      <input
                        type="url"
                        id="videoUrl"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15"
                        placeholder="https://example.com/video.mp4"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-grey-15 mb-2">
                    Description *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <RiFileTextLine className="w-5 h-5 text-grey-15/40" />
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 resize-none"
                      placeholder="Describe the lesson content, objectives, and what students will learn..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div>
                <h2 className="text-xl font-semibold text-grey-15 mb-6 flex items-center gap-2">
                  <RiMoneyDollarCircleLine className="w-6 h-6 text-orange-50" />
                  Pricing Options
                </h2>
                
                <div className="space-y-6">
                  {/* Free/Paid Toggle */}
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="lessonType"
                        checked={!formData.isPaid}
                        onChange={() => setFormData({ ...formData, isPaid: false, price: '' })}
                        className="w-4 h-4 text-orange-50 focus:ring-orange-50"
                      />
                      <span className="text-grey-15 font-medium">Free Lesson</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="lessonType"
                        checked={formData.isPaid}
                        onChange={() => setFormData({ ...formData, isPaid: true, price: '' })}
                        className="w-4 h-4 text-orange-50 focus:ring-orange-50"
                      />
                      <span className="text-grey-15 font-medium">Paid Lesson</span>
                    </label>
                  </div>

                  {/* Price Input */}
                  {formData.isPaid && (
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-grey-15 mb-2">
                        Price (USD) *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <RiMoneyDollarCircleLine className="w-5 h-5 text-grey-15/40" />
                        </div>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="w-full pl-10 pr-4 py-3 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15"
                          placeholder="0.00"
                          required={formData.isPaid}
                        />
                      </div>
                      <p className="text-sm text-grey-15/60 mt-1">
                        Students will need to pay this amount to access the lesson content.
                      </p>
                    </div>
                  )}

                  {/* Pricing Info */}
                  <div className="bg-orange-90 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <RiCheckLine className="w-5 h-5 text-orange-50 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-grey-15">
                        <p className="font-medium mb-1">Pricing Guidelines:</p>
                        <ul className="space-y-1 text-grey-15/70">
                          <li>• Free lessons are accessible to all students</li>
                          <li>• Paid lessons require payment before viewing</li>
                          <li>• Students can only see lessons for their class level</li>
                          <li>• Payment is processed securely through the platform</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white-95">
                <button
                  type="button"
                  onClick={() => navigate('/lessons')}
                  className="px-6 py-3 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 ${
                    isLoading
                      ? 'bg-orange-50/50 cursor-not-allowed text-white'
                      : 'bg-orange-50 hover:bg-orange-50/90 text-white'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Lesson...
                    </>
                  ) : (
                    <>
                      <RiSaveLine className="w-5 h-5" />
                      Create Lesson
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;