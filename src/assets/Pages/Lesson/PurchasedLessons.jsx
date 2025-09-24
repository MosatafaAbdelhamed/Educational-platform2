import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  RiBookOpenFill, 
  RiTimeFill, 
  RiUserFill,
  RiArrowRightLine,
  RiStarFill,
  RiPlayCircleLine,
  RiCheckLine,
  RiErrorWarningFill
} from "@remixicon/react";

const PurchasedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchasedLessons();
  }, []);

  const fetchPurchasedLessons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://edu-master-psi.vercel.app/lesson/my/purchased', {
        headers: { token }
      });
      
      const payload = response?.data;
      const list = Array.isArray(payload?.lessons) 
        ? payload.lessons 
        : (Array.isArray(payload) ? payload : []);
      setLessons(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch purchased lessons');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">Loading your purchased lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiErrorWarningFill className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-grey-15 mb-2">Error Loading Lessons</h3>
          <p className="text-grey-15/70 mb-6">{error}</p>
          <button 
            onClick={fetchPurchasedLessons}
            className="primary-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-70">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              My Purchased Lessons
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Access all the lessons you've purchased and continue your learning journey
            </p>
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section className="py-20">
        <div className="container">
          {lessons.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-orange-90 rounded-full flex items-center justify-center mx-auto mb-6">
                <RiBookOpenFill className="w-12 h-12 text-orange-50" />
              </div>
              <h3 className="text-2xl font-semibold text-grey-15 mb-4">No Purchased Lessons Yet</h3>
              <p className="text-grey-15/70 mb-8 max-w-md mx-auto">
                You haven't purchased any lessons yet. Browse our courses and start your learning journey!
              </p>
              <Link to="/courses" className="primary-btn">
                Browse Courses
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-grey-15">
                  {lessons.length} Purchased Lesson{lessons.length !== 1 ? 's' : ''}
                </h2>
                <div className="flex items-center gap-2 text-grey-15/60">
                  <RiCheckLine className="w-5 h-5 text-green-500" />
                  <span>All lessons available</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lessons.map((lesson) => (
                  <div key={lesson._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={lesson.image || "/images/lesson-placeholder.jpg"} 
                        alt={lesson.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <RiPlayCircleLine className="w-8 h-8 text-orange-50" />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-500/90 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                          Purchased
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <RiStarFill className="w-5 h-5 text-orange-50" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-grey-15 group-hover:text-orange-50 transition-colors line-clamp-2">
                        {lesson.title}
                      </h3>
                      <p className="text-grey-15/70 mb-4 leading-relaxed line-clamp-3">
                        {lesson.description}
                      </p>
                      
                      {/* Lesson Meta */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-grey-15/60">
                          <RiUserFill className="w-4 h-4" />
                          <span>{lesson.instructor || 'SkillBridge Instructor'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-grey-15/60">
                          <RiTimeFill className="w-4 h-4" />
                          <span>{lesson.duration || 'Self-paced'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <RiStarFill key={i} className="w-4 h-4 text-orange-50" />
                          ))}
                          <span className="text-sm text-grey-15/60 ml-1">({lesson.rating || '4.9'})</span>
                        </div>
                      </div>
                      
                      {/* Lesson Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white-95">
                        <div className="text-sm text-green-600 font-medium">
                          ✓ Purchased
                        </div>
                        <Link 
                          to={`/lessons/${lesson._id}`} 
                          className="text-orange-50 font-medium hover:text-orange-50/80 transition-colors flex items-center gap-1"
                        >
                          Start Learning
                          <RiArrowRightLine className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-grey-15">
              Want to Learn More?
            </h2>
            <p className="text-lg text-grey-15/70">
              Explore our full catalog of courses and discover new skills to master
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="primary-btn">
                Browse All Courses
              </Link>
              <Link to="/pricing" className="secondary-btn">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurchasedLessons;

