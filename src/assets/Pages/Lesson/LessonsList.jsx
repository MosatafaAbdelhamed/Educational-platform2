import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  RiBookOpenLine, 
  RiSearchLine, 
  RiFilterLine, 
  RiRefreshLine,
  RiAddLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiArrowRightLine,
  RiMoneyDollarCircleLine,
  RiGraduationCapLine,
  RiVideoLine,
  RiTimeLine,
  RiUserLine
} from "@remixicon/react";

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassLevel, setSelectedClassLevel] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [filteredLessons, setFilteredLessons] = useState([]);

  useEffect(() => {
    const init = async () => {
      await fetchRole();
      await fetchLessons();
    };
    init();
  }, []);

  useEffect(() => {
    filterLessons();
  }, [searchTerm, selectedClassLevel, priceFilter, lessons]);

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://edu-master-psi.vercel.app/lesson', {
        headers: { token }
      });
      setLessons(response.data.lessons || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch lessons');
      setLoading(false);
    }
  };

  const fetchRole = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://edu-master-psi.vercel.app/user/', { headers: { token } });
      const payload = response?.data;
      const userData = payload?.user || payload?.data || payload;
      setRole(userData?.role || 'USER');
      setAuthLoading(false);
    } catch {
      setRole('USER');
      setAuthLoading(false);
    }
  };

  const filterLessons = () => {
    let filtered = lessons.filter(lesson => {
      const matchesSearch = lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = selectedClassLevel === 'all' || 
                          lesson.classLevel === selectedClassLevel;
      
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'free' && (!lesson.isPaid || lesson.price === 0)) ||
                          (priceFilter === 'paid' && lesson.isPaid && lesson.price > 0);
      
      return matchesSearch && matchesClass && matchesPrice;
    });

    setFilteredLessons(filtered);
  };

  const handleDeleteLesson = async (lessonId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this lesson?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://edu-master-psi.vercel.app/lesson/${lessonId}`, {
        headers: { token }
      });
      setLessons(lessons.filter(lesson => lesson._id !== lessonId));
      alert('Lesson deleted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lesson');
    }
  };

  const classLevels = [
    'all', 'grade-1', 'grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6',
    'grade-7', 'grade-8', 'grade-9', 'grade-10', 'grade-11', 'grade-12',
    'university', 'professional'
  ];

  const formatClassLevel = (level) => {
    if (!level) return 'Not Set';
    if (level.startsWith('grade-')) {
      return level.replace('grade-', 'Grade ') + (level.includes('grade-') ? '' : '');
    }
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">جارِ التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiBookOpenLine className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchLessons}
            className="primary-btn"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Restrict to Admins only
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8 max-w-md w-full text-center">
          <h3 className="text-xl font-semibold text-grey-15 mb-2">غير مصرح</h3>
          <p className="text-grey-15/70 mb-6">هذه الصفحة مخصصة للمشرفين فقط.</p>
          <Link to="/courses" className="primary-btn">الذهاب إلى الدروس</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header */
      }
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">إدارة الدروس والأسئلة</h1>
              <p className="text-grey-15/70">إضافة وتعديل الدروس، وإدارة الأسئلة.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/lessons/add" className="primary-btn inline-flex items-center gap-2">
                <RiAddLine className="w-5 h-5" />
                إضافة درس
              </Link>
              <Link to="/questions/add" className="px-4 py-3 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 inline-flex items-center gap-2">
                <RiAddLine className="w-5 h-5" />
                إضافة سؤال
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiSearchLine className="w-5 h-5 text-grey-15/40" />
                </div>
                <input
                  type="text"
                  placeholder="Search lessons by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 w-full"
                />
              </div>
            </div>

            {/* Class Level Filter */}
            <div>
              <select
                value={selectedClassLevel}
                onChange={(e) => setSelectedClassLevel(e.target.value)}
                className="w-full px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 text-grey-15 bg-white"
              >
                <option value="all">All Levels</option>
                {classLevels.slice(1).map(level => (
                  <option key={level} value={level}>
                    {formatClassLevel(level)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex gap-2">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 text-grey-15 bg-white"
              >
                <option value="all">All Prices</option>
                <option value="free">Free Lessons</option>
                <option value="paid">Paid Lessons</option>
              </select>
              <button 
                onClick={fetchLessons}
                className="px-3 py-2 text-grey-15/60 hover:text-orange-50 transition-colors border border-white-95 rounded-lg"
                title="Refresh"
              >
                <RiRefreshLine className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-grey-15/60">
            <span>Showing {filteredLessons.length} of {lessons.length} lessons</span>
            <div className="flex items-center gap-2">
              <span>Filters:</span>
              {selectedClassLevel !== 'all' && (
                <span className="px-2 py-1 bg-orange-90 text-orange-50 rounded-full text-xs">
                  {formatClassLevel(selectedClassLevel)}
                </span>
              )}
              {priceFilter !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                  {priceFilter === 'free' ? 'Free' : 'Paid'}
                </span>
              )}
              {searchTerm && (
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                  Search: {searchTerm}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lessons List */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-white-95 text-center">
            <div className="w-24 h-24 bg-orange-90 rounded-full flex items-center justify-center mx-auto mb-6">
              <RiBookOpenLine className="w-12 h-12 text-orange-50" />
            </div>
            <h3 className="text-xl font-semibold text-grey-15 mb-2">
              {searchTerm || selectedClassLevel !== 'all' || priceFilter !== 'all' ? 'No lessons found' : 'No lessons yet'}
            </h3>
            <p className="text-grey-15/60 mb-6">
              {searchTerm || selectedClassLevel !== 'all' || priceFilter !== 'all'
                ? 'Try adjusting your search or filter criteria' 
                : 'Start by creating your first lesson'
              }
            </p>
            {!searchTerm && selectedClassLevel === 'all' && priceFilter === 'all' && (
              <Link to="/lessons/add" className="primary-btn">
                Create First Lesson
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredLessons.map((lesson) => (
              <div key={lesson._id} className="bg-white rounded-xl p-6 shadow-sm border border-white-95 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-70 rounded-lg flex items-center justify-center flex-shrink-0">
                      <RiVideoLine className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-grey-15">
                          {lesson.title}
                        </h3>
                        {lesson.isPaid && lesson.price > 0 ? (
                          <span className="px-3 py-1 bg-orange-90 text-orange-50 rounded-full text-sm font-medium">
                            ${lesson.price}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            Free
                          </span>
                        )}
                      </div>
                      
                      <p className="text-grey-15/70 mb-4 line-clamp-2">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-grey-15/60">
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
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="p-2 text-grey-15/60 hover:text-blue-500 transition-colors"
                      title="View Details"
                    >
                      <RiEyeLine className="w-5 h-5" />
                    </Link>
                    <Link
                      to={`/lessons/${lesson._id}/edit`}
                      className="p-2 text-grey-15/60 hover:text-green-500 transition-colors"
                      title="Edit Lesson"
                    >
                      <RiEditLine className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteLesson(lesson._id)}
                      className="p-2 text-grey-15/60 hover:text-red-500 transition-colors"
                      title="Delete Lesson"
                    >
                      <RiDeleteBinLine className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white-95">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <RiMoneyDollarCircleLine className="w-4 h-4 text-orange-50" />
                        <span className="text-grey-15/60">
                          {lesson.isPaid && lesson.price > 0 ? `Paid Lesson - $${lesson.price}` : 'Free Lesson'}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="text-orange-50 hover:text-orange-50/80 transition-colors text-sm font-medium flex items-center gap-1"
                    >
                      View Details
                      <RiArrowRightLine className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <RiBookOpenLine className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-grey-15">Total Lessons</h3>
                <p className="text-2xl font-bold text-blue-500">{lessons.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <RiMoneyDollarCircleLine className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-grey-15">Free Lessons</h3>
                <p className="text-2xl font-bold text-green-500">
                  {lessons.filter(lesson => !lesson.isPaid || lesson.price === 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <RiGraduationCapLine className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-grey-15">Paid Lessons</h3>
                <p className="text-2xl font-bold text-orange-500">
                  {lessons.filter(lesson => lesson.isPaid && lesson.price > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <RiAddLine className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-grey-15">Quick Actions</h3>
                <p className="text-sm text-grey-15/60">Add new lesson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsList;
