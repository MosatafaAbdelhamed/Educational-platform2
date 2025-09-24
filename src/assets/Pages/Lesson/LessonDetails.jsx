import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  RiVideoLine,
  RiMoneyDollarCircleLine,
  RiLockLine,
  RiCheckLine,
  RiErrorWarningFill,
  RiArrowLeftLine,
  RiPlayCircleLine,
  RiGraduationCapLine,
  RiTimeLine,
  RiUserLine,
  RiBankCardLine
} from "@remixicon/react";

const LessonDetails = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessonDetails();
    checkPurchaseStatus();
  }, [lessonId]);

    const fetchLessonDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://edu-master-psi.vercel.app/lesson/${lessonId}`, {
        headers: { token }
        });
        setLesson(response.data.lesson);
        setLoading(false);
      } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch lesson details');
        setLoading(false);
      }
    };

  const checkPurchaseStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      // Check if user has purchased this lesson
      const response = await axios.get(`https://edu-master-psi.vercel.app/lesson/purchased/${lessonId}`, {
        headers: { token }
      });
      setIsPurchased(response.data.purchased || false);
    } catch {
      setIsPurchased(false);
    } finally {
      setCheckingPurchase(false);
    }
  };

  const handlePayLesson = () => {
    navigate(`/lessons/${lessonId}/payment`);
  };

  const formatClassLevel = (level) => {
    if (!level) return 'Not Set';
    if (level.startsWith('grade-')) {
      return level.replace('grade-', 'Grade ');
    }
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  if (loading || checkingPurchase) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">Loading lesson details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiErrorWarningFill className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/lessons" className="primary-btn">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <p className="text-grey-15/70">Lesson not found</p>
          <Link to="/lessons" className="primary-btn mt-4">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  const canAccessLesson = !lesson.isPaid || lesson.price === 0 || isPurchased;

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header */}
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
            >
              <RiArrowLeftLine className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-grey-15 mb-2">{lesson.title}</h1>
              <div className="flex items-center gap-4 text-sm text-grey-15/60">
                <div className="flex items-center gap-1">
                  <RiGraduationCapLine className="w-4 h-4" />
                  <span>{formatClassLevel(lesson.classLevel)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiTimeLine className="w-4 h-4" />
                  <span>Created: {new Date(lesson.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiUserLine className="w-4 h-4" />
                  <span>Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6 mb-8">
              {canAccessLesson ? (
                <div className="relative">
                  <div className="aspect-video bg-grey-15/10 rounded-lg flex items-center justify-center mb-4">
                    <video 
                      controls 
                      className="w-full h-full rounded-lg"
                      poster="/video-placeholder.jpg"
                    >
                      <source src={lesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex items-center gap-3 text-green-600">
                    <RiCheckLine className="w-5 h-5" />
                    <span className="text-sm font-medium">Lesson Access Granted</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-orange-90 to-orange-70 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative text-center z-10">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <RiLockLine className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Premium Content</h3>
                    <p className="text-white/90 mb-4">This lesson requires payment to access</p>
                    <div className="text-3xl font-bold text-white mb-4">${lesson.price}</div>
                    <button
                      onClick={handlePayLesson}
                      className="bg-white text-orange-50 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
                    >
                      <RiBankCardLine className="w-5 h-5" />
                      Purchase Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Description */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h2 className="text-xl font-semibold text-grey-15 mb-4">About This Lesson</h2>
              <p className="text-grey-15/70 leading-relaxed whitespace-pre-wrap">
                {lesson.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">Lesson Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RiVideoLine className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-grey-15/60">Type</p>
                    <p className="font-medium text-grey-15">Video Lesson</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <RiGraduationCapLine className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-grey-15/60">Level</p>
                    <p className="font-medium text-grey-15">{formatClassLevel(lesson.classLevel)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${lesson.isPaid && lesson.price > 0 ? 'bg-orange-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                    <RiMoneyDollarCircleLine className={`w-5 h-5 ${lesson.isPaid && lesson.price > 0 ? 'text-orange-500' : 'text-green-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-grey-15/60">Price</p>
                    <p className="font-medium text-grey-15">
                      {lesson.isPaid && lesson.price > 0 ? `$${lesson.price}` : 'Free'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${canAccessLesson ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                    {canAccessLesson ? (
                      <RiCheckLine className="w-5 h-5 text-green-500" />
                    ) : (
                      <RiLockLine className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-grey-15/60">Access</p>
                    <p className={`font-medium ${canAccessLesson ? 'text-green-600' : 'text-red-600'}`}>
                      {canAccessLesson ? 'Available' : 'Locked'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            {lesson.isPaid && lesson.price > 0 && !isPurchased && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-70 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Unlock This Lesson</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold mb-1">${lesson.price}</div>
                  <p className="text-white/90 text-sm">One-time payment</p>
                </div>
                
                <button
                  onClick={handlePayLesson}
                  className="w-full bg-white text-orange-50 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RiBankCardLine className="w-5 h-5" />
                  Purchase Now
                </button>
                
                <div className="mt-4 text-center text-xs text-white/80">
                  <p>✓ Secure payment processing</p>
                  <p>✓ Lifetime access</p>
                  <p>✓ Money-back guarantee</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {isPurchased && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <RiCheckLine className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-800">Access Granted</h3>
                </div>
                <p className="text-green-700 text-sm">
                  You have successfully purchased this lesson. Enjoy learning!
                </p>
              </div>
            )}

            {/* Related Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  to="/lessons"
                  className="w-full flex items-center gap-3 p-3 text-grey-15 hover:bg-white-95 rounded-lg transition-colors"
                >
                  <RiVideoLine className="w-5 h-5 text-orange-50" />
                  <span>Browse All Lessons</span>
                </Link>
                
                <Link
                  to="/lessons/purchased"
                  className="w-full flex items-center gap-3 p-3 text-grey-15 hover:bg-white-95 rounded-lg transition-colors"
                >
                  <RiCheckLine className="w-5 h-5 text-green-500" />
                  <span>My Purchased Lessons</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
