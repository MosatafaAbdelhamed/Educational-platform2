import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { 
  RiTrophyLine,
  RiCheckLine,
  RiCloseLine,
  RiTimeLine,
  RiFileList3Line,
  RiBarChartLine,
  RiRefreshLine,
  RiArrowRightLine,
  RiStarFill,
  RiAwardLine,
  RiBookOpenLine,
  RiErrorWarningFill
} from "@remixicon/react";

const SubmitExam = () => {
  const { examId } = useParams();
  
  const [score, setScore] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExamResults();
    fetchExamDetails();
  }, [examId]);

  const fetchExamResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://edu-master-psi.vercel.app/studentExam/exams/score/${examId}`, {
        headers: { token }
        });
      setScore(response.data);
        setLoading(false);
      } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch exam results');
        setLoading(false);
      }
    };

  const fetchExamDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://edu-master-psi.vercel.app/exam/${examId}`, {
        headers: { token }
      });
      setExamDetails(response.data.exam);
    } catch (err) {
      console.error('Failed to fetch exam details:', err);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return 'Outstanding! Excellent work!';
    if (percentage >= 80) return 'Great job! Well done!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Not bad! Room for improvement.';
    return 'Keep studying! You can do better!';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">Calculating your results...</p>
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
          <Link to="/student-exams" className="primary-btn">
            Back to Exams
          </Link>
        </div>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <p className="text-grey-15/70">No results found</p>
          <Link to="/student-exams" className="primary-btn mt-4">
            Back to Exams
          </Link>
        </div>
      </div>
    );
  }

  const percentage = score.totalQuestions > 0 ? Math.round((score.correctAnswers / score.totalQuestions) * 100) : 0;
  const passed = percentage >= 60;

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header */}
      <div className="bg-white border-b border-white-95">
        <div className="container py-8">
          <div className="text-center">
            <div className={`w-20 h-20 ${getScoreBgColor(percentage)} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {percentage >= 80 ? (
                <RiTrophyLine className="w-10 h-10 text-green-600" />
              ) : percentage >= 60 ? (
                <RiAwardLine className="w-10 h-10 text-yellow-600" />
              ) : (
                <RiBookOpenLine className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-grey-15 mb-2">Exam Completed!</h1>
            <p className="text-grey-15/70">{examDetails?.title || 'Exam Results'}</p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Score Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(percentage)} mb-6`}>
                <span className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
                  {percentage}%
                </span>
              </div>
              <h2 className="text-2xl font-bold text-grey-15 mb-2">
                {getPerformanceMessage(percentage)}
              </h2>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {passed ? (
                  <>
                    <RiCheckLine className="w-4 h-4" />
                    Passed
                  </>
                ) : (
                  <>
                    <RiCloseLine className="w-4 h-4" />
                    Failed
                  </>
                )}
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white-97 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RiCheckLine className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">{score.correctAnswers}</h3>
                <p className="text-sm text-grey-15/60">Correct Answers</p>
              </div>

              <div className="text-center p-6 bg-white-97 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RiCloseLine className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-600">{score.incorrectAnswers}</h3>
                <p className="text-sm text-grey-15/60">Incorrect Answers</p>
              </div>

              <div className="text-center p-6 bg-white-97 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RiFileList3Line className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600">{score.totalQuestions}</h3>
                <p className="text-sm text-grey-15/60">Total Questions</p>
              </div>

              <div className="text-center p-6 bg-white-97 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RiTimeLine className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600">{score.timeSpent || 'N/A'}</h3>
                <p className="text-sm text-grey-15/60">Time Spent (min)</p>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Score Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4 flex items-center gap-2">
                <RiBarChartLine className="w-5 h-5 text-orange-50" />
                Score Breakdown
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-grey-15/70">Accuracy</span>
                    <span className="text-sm font-medium text-grey-15">{percentage}%</span>
                  </div>
                  <div className="w-full bg-white-95 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        percentage >= 80 ? 'bg-green-500' : 
                        percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-grey-15/70">Correct Rate</span>
                    <span className="text-sm font-medium text-grey-15">
                      {score.totalQuestions > 0 ? Math.round((score.correctAnswers / score.totalQuestions) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-white-95 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${score.totalQuestions > 0 ? (score.correctAnswers / score.totalQuestions) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6">
              <h3 className="text-lg font-semibold text-grey-15 mb-4 flex items-center gap-2">
                <RiStarFill className="w-5 h-5 text-orange-50" />
                Recommendations
              </h3>
              
              <div className="space-y-3">
                {percentage >= 80 ? (
                  <>
                    <div className="flex items-start gap-3">
                      <RiCheckLine className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-grey-15/70">Excellent performance! Consider taking advanced courses.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <RiCheckLine className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-grey-15/70">You have a strong understanding of the material.</p>
                    </div>
                  </>
                ) : percentage >= 60 ? (
                  <>
                    <div className="flex items-start gap-3">
                      <RiAwardLine className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-grey-15/70">Good work! Review the topics you missed.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <RiAwardLine className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-grey-15/70">Practice more to improve your score.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <RiBookOpenLine className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-grey-15/70">Review the lesson materials thoroughly.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <RiBookOpenLine className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-grey-15/70">Consider retaking the exam after studying.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-grey-15 mb-6">What's Next?</h3>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/student-exams"
                  className="px-6 py-3 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RiFileList3Line className="w-5 h-5" />
                  Take Another Exam
                </Link>
                
                <Link
                  to="/lessons"
                  className="px-6 py-3 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RiBookOpenLine className="w-5 h-5" />
                  Study More Lessons
                </Link>
                
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-orange-50 text-white rounded-lg hover:bg-orange-50/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <RiAwardLine className="w-5 h-5" />
                  Print Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitExam;
