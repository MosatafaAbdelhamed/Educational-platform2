import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  RiSearchLine, 
  RiFilterLine, 
  RiStarFill, 
  RiTimeFill, 
  RiUserFill,
  RiArrowRightLine,
  RiBookOpenLine,
  RiPlayCircleLine
} from "@remixicon/react";
// NOTE: This page now pulls lessons from the API instead of static data

const mockLessons = [
  {
    _id: 'mock-1',
    title: 'Algebra Basics',
    description: 'Understand variables, equations, and simple problem solving.',
    classLevel: 'Grade 1 Secondary',
    isPaid: false,
    price: 0,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    title: 'Physics: Motion and Forces',
    description: 'Intro to kinematics, velocity, acceleration, and Newton’s laws.',
    classLevel: 'Grade 2 Secondary',
    isPaid: true,
    price: 15,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-3',
    title: 'Chemistry Fundamentals',
    description: 'Atoms, molecules, periodic table essentials, and bonding.',
    classLevel: 'Grade 3 Secondary',
    isPaid: true,
    price: 10,
    createdAt: new Date().toISOString()
  }
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isPaid, setIsPaid] = useState('all'); // 'all' | 'true' | 'false'
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [scheduledAfter, setScheduledAfter] = useState(''); // YYYY-MM-DD
  const [sortBy, setSortBy] = useState('scheduledDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // admin local lessons
  const [adminLocal, setAdminLocal] = useState([]);

  const levels = ['all', 'Grade 1 Secondary', 'Grade 2 Secondary', 'Grade 3 Secondary'];

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      // map filters to backend params
      if (isPaid !== 'all') params.append('isPaid', isPaid);
      if (searchTerm) params.append('title', searchTerm);
      if (selectedLevel !== 'all') params.append('classLevel', selectedLevel);
      if (priceMin) params.append('priceMin', priceMin);
      if (priceMax) params.append('priceMax', priceMax);
      if (scheduledAfter) params.append('scheduledAfter', scheduledAfter);
      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (page) params.append('page', String(page));
      if (limit) params.append('limit', String(limit));

      const url = `https://edu-master-psi.vercel.app/lesson${params.toString() ? `/?${params.toString()}` : ''}`;
      const response = await axios.get(url, { headers: { token } });
      const payload = response?.data;
      const list = Array.isArray(payload?.lessons)
        ? payload.lessons
        : (Array.isArray(payload) ? payload : []);
      setLessons(list);
      setLoading(false);
    } catch (err) {
      // fallback to mock data so the page always shows content
      setLessons(mockLessons);
      setError('');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaid, selectedLevel, sortBy, sortOrder, page, limit]);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || lesson.classLevel === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const formatLevel = (level) => {
    if (!level) return 'Not specified';
    return level;
  };

  // Merge admin local lessons
  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin_lessons');
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        setAdminLocal(parsed);
      }
    } catch {
      setAdminLocal([]);
    }
  }, []);

  const mergedLessons = [...adminLocal, ...lessons];

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-70">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Explore Our Courses
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Discover a wide range of lessons designed to help you grow your skills
            </p>
          </div>
        </div>
      </section>

      {/* Search, Quick Add and Filter Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Admin quick add moved to AdminDashboard */}
            <div className="mb-6 flex gap-3">
              <button
                onClick={() => setLessons(mockLessons)}
                className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95"
              >
                Load Sample Lessons
              </button>
            </div>
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RiSearchLine className="w-5 h-5 text-grey-15/50" />
              </div>
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 placeholder-grey-15/50"
              />
              <div className="mt-3 flex gap-3">
                <button onClick={() => { setPage(1); fetchLessons(); }} className="px-4 py-2 border border-white-95 rounded-lg hover:bg-white-95">Search</button>
                {searchTerm && (
                  <button onClick={() => { setSearchTerm(''); setPage(1); fetchLessons(); }} className="px-4 py-2 text-orange-50 hover:text-orange-50/80">Clear search</button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Level Filter */}
              <div className="flex items-center gap-2">
                <RiFilterLine className="w-5 h-5 text-grey-15/60" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 text-grey-15 bg-white"
                >
                  <option value="all">All Levels</option>
                  {levels.slice(1).map(level => (
                    <option key={level} value={level}>{formatLevel(level)}</option>
                  ))}
                </select>
              </div>

              {/* Paid Filter */}
              <div>
                <select
                  value={isPaid}
                  onChange={(e) => { setIsPaid(e.target.value); setPage(1); }}
                  className="px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 text-grey-15 bg-white"
                >
                  <option value="all">All Prices</option>
                  <option value="true">Paid</option>
                  <option value="false">Free</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-2">
                <input type="number" min="0" placeholder="Min $" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-28 px-3 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                <input type="number" min="0" placeholder="Max $" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-28 px-3 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50" />
                <button onClick={() => { setPage(1); fetchLessons(); }} className="px-3 py-2 border border-white-95 rounded-lg hover:bg-white-95">Apply</button>
              </div>

              {/* Scheduled After */}
              <div className="flex items-center gap-2">
                <input type="date" value={scheduledAfter} onChange={(e) => setScheduledAfter(e.target.value)} className="px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 text-grey-15 bg-white" />
                <button onClick={() => { setPage(1); fetchLessons(); }} className="px-3 py-2 border border-white-95 rounded-lg hover:bg-white-95">Apply</button>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-white-95 rounded-lg bg-white">
                  <option value="scheduledDate">Scheduled Date</option>
                  <option value="price">Price</option>
                  <option value="createdAt">Created At</option>
                  <option value="title">Title</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-4 py-2 border border-white-95 rounded-lg bg-white">
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLevel('all');
                  setIsPaid('all');
                  setPriceMin('');
                  setPriceMax('');
                  setScheduledAfter('');
                  setSortBy('scheduledDate');
                  setSortOrder('asc');
                  setPage(1);
                  setLimit(9);
                  fetchLessons();
                }}
                className="px-4 py-2 text-orange-50 hover:text-orange-50/80 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-grey-15">
              {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} found
            </h2>
          </div>

          {loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-grey-15/70">Loading lessons...</p>
            </div>
          )}
          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-red-600 mb-4">{error}</p>
            </div>
          )}

          {!loading && !error && filteredLessons.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-orange-90 rounded-full flex items-center justify-center mx-auto mb-6">
                <RiSearchLine className="w-12 h-12 text-orange-50" />
              </div>
              <h3 className="text-xl font-semibold text-grey-15 mb-2">No lessons found</h3>
              <p className="text-grey-15/60 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLevel('all');
                }}
                className="primary-btn"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLessons.map((lesson) => (
                <div key={lesson._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    {/* Placeholder visual since lessons don't include an image */}
                    <div className="w-full h-48 bg-gradient-to-br from-orange-50 to-orange-70 flex items-center justify-center">
                      <RiBookOpenLine className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <RiPlayCircleLine className="w-8 h-8 text-orange-50" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2"></div>
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
                    
                    {/* Course Meta */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-grey-15/60">
                        <RiUserFill className="w-4 h-4" />
                        <span>Level: {formatLevel(lesson.classLevel)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-grey-15/60">
                        <RiTimeFill className="w-4 h-4" />
                        <span>Added: {lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : '—'}</span>
                      </div>
                      <div className="flex items-center gap-1"></div>
                    </div>
                    
                    {/* Course Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white-95">
                      <div className="text-2xl font-bold text-orange-50">
                        {lesson.isPaid && lesson.price > 0 ? `$${lesson.price}` : 'Free'}
                      </div>
                      <Link 
                        to={`/lessons/${lesson._id}`} 
                        className="text-orange-50 font-medium hover:text-orange-50/80 transition-colors flex items-center gap-1"
                      >
                        View Details
                        <RiArrowRightLine className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className={`px-4 py-2 rounded-lg border ${page <= 1 ? 'text-grey-15/40 bg-white-95 cursor-not-allowed' : 'hover:bg-white-95'}`}>Prev</button>
              <span className="text-sm text-grey-15/60">Page {page}</span>
              <button onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-lg border hover:bg-white-95">Next</button>
              <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="ml-3 px-3 py-2 border rounded-lg">
                <option value={5}>5</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
              </select>
            </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-grey-15">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-grey-15/70">
              Contact us to request a custom lesson or get personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="primary-btn">
                Contact Us
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

export default Courses;
