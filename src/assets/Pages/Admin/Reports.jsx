import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  RiBarChartLine, 
  RiPieChartLine, 
  RiLineChartLine,
  RiUserLine,
  RiBookOpenLine,
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiDownloadLine,
  RiCalendarLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiRefreshLine
} from "@remixicon/react";

const Reports = () => {
  const [reports, setReports] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalExams: 0,
    totalRevenue: 0,
    monthlyStats: [],
    examScores: [],
    lessonPopularity: [],
    userGrowth: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState('30'); // days

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all report data in parallel
      const [usersRes, lessonsRes, examsRes] = await Promise.all([
        axios.get('https://edu-master-psi.vercel.app/admin/all-user', {
          headers: { token }
        }),
        axios.get('https://edu-master-psi.vercel.app/lesson', {
          headers: { token }
        }),
        axios.get('https://edu-master-psi.vercel.app/exam', {
          headers: { token }
        })
      ]);

      // Mock data for demonstration (replace with actual API calls)
      const mockReports = {
        totalUsers: usersRes.data.users?.length || 0,
        totalLessons: lessonsRes.data.lessons?.length || 0,
        totalExams: examsRes.data.exams?.length || 0,
        totalRevenue: 12500, // Mock revenue data
        monthlyStats: [
          { month: 'Jan', users: 120, lessons: 15, revenue: 2500 },
          { month: 'Feb', users: 180, lessons: 22, revenue: 3200 },
          { month: 'Mar', users: 250, lessons: 28, revenue: 4100 },
          { month: 'Apr', users: 320, lessons: 35, revenue: 5200 },
          { month: 'May', users: 400, lessons: 42, revenue: 6300 },
          { month: 'Jun', users: 480, lessons: 48, revenue: 7500 }
        ],
        examScores: [
          { exam: 'Math Basics', avgScore: 85, attempts: 120 },
          { exam: 'Science Quiz', avgScore: 78, attempts: 95 },
          { exam: 'English Test', avgScore: 92, attempts: 110 },
          { exam: 'History Exam', avgScore: 73, attempts: 85 }
        ],
        lessonPopularity: [
          { lesson: 'Introduction to Programming', views: 450, purchases: 120 },
          { lesson: 'Web Development Basics', views: 380, purchases: 95 },
          { lesson: 'Database Design', views: 320, purchases: 78 },
          { lesson: 'UI/UX Design', views: 290, purchases: 65 }
        ],
        userGrowth: [
          { week: 'Week 1', newUsers: 25, totalUsers: 125 },
          { week: 'Week 2', newUsers: 35, totalUsers: 160 },
          { week: 'Week 3', newUsers: 42, totalUsers: 202 },
          { week: 'Week 4', newUsers: 38, totalUsers: 240 }
        ]
      };

      setReports(mockReports);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
      setLoading(false);
    }
  };

  const handleExportReport = (type) => {
    // Mock export functionality
    alert(`Exporting ${type} report...`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiBarChartLine className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchReports}
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
      {/* Header */}
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">Reports & Analytics</h1>
              <p className="text-grey-15/70">Comprehensive insights into your platform performance.</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-white-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-50 text-grey-15 bg-white"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button 
                onClick={fetchReports}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
                title="Refresh"
              >
                <RiRefreshLine className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-grey-15/60 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-grey-15">{reports.totalUsers}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                  <RiArrowUpLine className="w-4 h-4" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <RiUserLine className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-grey-15/60 mb-1">Total Lessons</p>
                <p className="text-3xl font-bold text-grey-15">{reports.totalLessons}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                  <RiArrowUpLine className="w-4 h-4" />
                  +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <RiBookOpenLine className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-grey-15/60 mb-1">Total Exams</p>
                <p className="text-3xl font-bold text-grey-15">{reports.totalExams}</p>
                <p className="text-sm text-blue-600 flex items-center gap-1 mt-2">
                  <RiArrowUpLine className="w-4 h-4" />
                  +15% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <RiFileList3Line className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-white-95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-grey-15/60 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-grey-15">${reports.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                  <RiArrowUpLine className="w-4 h-4" />
                  +22% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <RiMoneyDollarCircleLine className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-grey-15">Monthly Growth</h3>
              <button
                onClick={() => handleExportReport('monthly-growth')}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
                title="Export Report"
              >
                <RiDownloadLine className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {reports.monthlyStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-white-95 rounded-t-lg flex flex-col justify-end h-48 p-2">
                    <div 
                      className="bg-orange-50 rounded-t"
                      style={{ height: `${(stat.users / 500) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-grey-15/60 mt-2">{stat.month}</p>
                  <p className="text-sm font-medium text-grey-15">{stat.users}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-grey-15">Exam Performance</h3>
              <button
                onClick={() => handleExportReport('exam-performance')}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
                title="Export Report"
              >
                <RiDownloadLine className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {reports.examScores.map((exam, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-grey-15">{exam.exam}</p>
                    <div className="w-full bg-white-95 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          exam.avgScore >= 80 ? 'bg-green-500' : 
                          exam.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${exam.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-grey-15">{exam.avgScore}%</p>
                    <p className="text-xs text-grey-15/60">{exam.attempts} attempts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lesson Popularity */}
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-grey-15">Popular Lessons</h3>
              <button
                onClick={() => handleExportReport('lesson-popularity')}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
                title="Export Report"
              >
                <RiDownloadLine className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {reports.lessonPopularity.map((lesson, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white-97 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-grey-15 mb-1">{lesson.lesson}</p>
                    <div className="flex items-center gap-4 text-xs text-grey-15/60">
                      <span className="flex items-center gap-1">
                        <RiBarChartLine className="w-3 h-3" />
                        {lesson.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <RiMoneyDollarCircleLine className="w-3 h-3" />
                        {lesson.purchases} purchases
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-50">
                      {Math.round((lesson.purchases / lesson.views) * 100)}%
                    </p>
                    <p className="text-xs text-grey-15/60">conversion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Growth */}
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-grey-15">User Growth Trend</h3>
              <button
                onClick={() => handleExportReport('user-growth')}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
                title="Export Report"
              >
                <RiDownloadLine className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {reports.userGrowth.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white-97 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-grey-15">{week.week}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-16 bg-white-95 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(week.newUsers / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-grey-15/60">+{week.newUsers} new</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-grey-15">{week.totalUsers}</p>
                    <p className="text-xs text-grey-15/60">total users</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export All Reports */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-white-95 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-grey-15 mb-2">Export All Reports</h3>
            <p className="text-grey-15/70 mb-6">Download comprehensive reports in various formats</p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleExportReport('pdf')}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors inline-flex items-center gap-2"
              >
                <RiDownloadLine className="w-4 h-4" />
                Export as PDF
              </button>
              
              <button
                onClick={() => handleExportReport('excel')}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2"
              >
                <RiDownloadLine className="w-4 h-4" />
                Export as Excel
              </button>
              
              <button
                onClick={() => handleExportReport('csv')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <RiDownloadLine className="w-4 h-4" />
                Export as CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
