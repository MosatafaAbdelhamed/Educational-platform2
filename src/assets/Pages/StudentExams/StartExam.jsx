import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  RiTimeLine,
  RiQuestionAnswerLine,
  RiCheckLine,
  RiErrorWarningFill,
  RiArrowLeftLine,
  RiFlagLine,
  RiPlayLine,
  RiPauseLine,
  RiAlertLine
} from "@remixicon/react";

const StartExam = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExamDetails();
    fetchExamQuestions();
    fetchRemainingTime();
  }, [examId]);

  // Ticking timer that doesn't recreate interval each second
  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime(prev => {
        if (isPaused) return prev;
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isPaused]);

  // Auto submit when time is up
  useEffect(() => {
    if (remainingTime === 0 && questions.length > 0) {
      setShowConfirmSubmit(false);
      if (!submitting) {
        handleSubmitExam();
      }
    }
  }, [remainingTime, questions.length]);

  const fetchExamDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://edu-master-psi.vercel.app/exam/${examId}`, {
        headers: { token }
      });
      setExam(response.data.exam);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch exam details');
    }
  };

  const fetchExamQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://edu-master-psi.vercel.app/studentExam/exams/${examId}/questions`, {
        headers: { token }
      });
      setQuestions(response.data.questions || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch exam questions');
      setLoading(false);
    }
  };

  const fetchRemainingTime = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://edu-master-psi.vercel.app/studentExam/exams/remaining-time/${examId}`, {
        headers: { token }
      });
      setRemainingTime(response.data.remainingTime || 0);
    } catch (err) {
      console.error('Failed to fetch remaining time:', err);
    }
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers({
      ...answers,
      [questionId]: selectedAnswer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleGoToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmitExam = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      }));

      await axios.post(`https://edu-master-psi.vercel.app/studentExam/submit/${examId}`, { 
        answers: formattedAnswers 
      }, {
        headers: { token }
      });

      navigate(`/student-exams/${examId}/submit`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit exam');
    } finally {
      setSubmitting(false);
      setShowConfirmSubmit(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getUnansweredCount = () => {
    return questions.length - getAnsweredCount();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">جاري تحميل الامتحان...</p>
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
          <button 
            onClick={() => navigate('/student-exams')}
            className="primary-btn"
          >
            رجوع للامتحانات
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <p className="text-grey-15/70">لا توجد أسئلة لهذا الامتحان</p>
          <button 
            onClick={() => navigate('/student-exams')}
            className="primary-btn mt-4"
          >
            رجوع للامتحانات
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isTimeUp = remainingTime <= 0;

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header with Timer */}
      <div className="bg-white border-b border-white-95 sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
              >
                <RiArrowLeftLine className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-grey-15">{exam?.title || 'امتحان'}</h1>
                <p className="text-sm text-grey-15/60">السؤال {currentQuestion + 1} من {questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                remainingTime < 300 ? 'bg-red-100 text-red-600' : 
                remainingTime < 600 ? 'bg-yellow-100 text-yellow-600' : 
                'bg-green-100 text-green-600'
              }`}>
                <RiTimeLine className="w-5 h-5" />
                <span className="font-mono font-bold">
                  {isTimeUp ? '00:00' : formatTime(remainingTime)}
                </span>
              </div>
              
              {/* Pause/Play */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 text-grey-15/60 hover:text-orange-50 transition-colors"
                title={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
              >
                {isPaused ? <RiPlayLine className="w-5 h-5" /> : <RiPauseLine className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-grey-15/60 mb-2">
              <span>Progress: {getAnsweredCount()}/{questions.length} answered</span>
              <span>{getUnansweredCount()} unanswered</span>
            </div>
            <div className="w-full bg-white-95 rounded-full h-2">
              <div 
                className="bg-orange-50 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getAnsweredCount() / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">التنقل بين الأسئلة</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((question, index) => (
                  <button
                    key={question._id}
                    onClick={() => handleGoToQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-orange-50 text-white'
                        : answers[question._id]
                        ? 'bg-green-100 text-green-600'
                        : 'bg-white-95 text-grey-15 hover:bg-white-95/80'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-50 rounded"></div>
                  <span className="text-grey-15/60">الحالي</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-grey-15/60">مجاب</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white-95 rounded"></div>
                  <span className="text-grey-15/60">غير مُجاب</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8">
              {isTimeUp ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiAlertLine className="w-8 h-8 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-grey-15 mb-4">انتهى الوقت!</h2>
                  <p className="text-grey-15/70 mb-6">انتهى وقت الامتحان وسيتم تسليم إجاباتك تلقائيًا.</p>
                  <button
                    onClick={handleSubmitExam}
                    disabled={submitting}
                    className="primary-btn"
                  >
                    تسليم الامتحان
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <RiQuestionAnswerLine className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-grey-15">السؤال {currentQuestion + 1}</h2>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-lg text-grey-15 mb-6 leading-relaxed">{currentQ.text}</p>
                    
                    <div className="space-y-3">
                      {(Array.isArray(currentQ.options) ? currentQ.options : []).map((option, index) => (
                        <label 
                          key={index}
                          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                            answers[currentQ._id] === option
                              ? 'border-orange-50 bg-orange-90 text-orange-50'
                              : 'border-white-95 hover:border-orange-50/50 hover:bg-white-95'
                          }`}
                        >
                          <input
                            type="radio"
                            name={currentQ._id}
                            value={option}
                            checked={answers[currentQ._id] === option}
                            onChange={() => handleAnswerChange(currentQ._id, option)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQ._id] === option
                              ? 'border-orange-50 bg-orange-50'
                              : 'border-grey-15/30'
                          }`}>
                            {answers[currentQ._id] === option && (
                              <RiCheckLine className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="flex-1">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-white-95">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        currentQuestion === 0
                          ? 'bg-white-95 text-grey-15/40 cursor-not-allowed'
                          : 'bg-white border border-white-95 text-grey-15 hover:bg-white-95'
                      }`}
                    >
                      السابق
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors inline-flex items-center gap-2"
                      >
                        <RiFlagLine className="w-4 h-4" />
                        تسليم الامتحان
                      </button>
                      
                      {currentQuestion < questions.length - 1 ? (
                        <button
                          onClick={handleNextQuestion}
                          className="primary-btn"
                        >
                          السؤال التالي
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowConfirmSubmit(true)}
                          className="primary-btn"
                        >
                          إنهاء الامتحان
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-90 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiFlagLine className="w-8 h-8 text-orange-50" />
              </div>
              <h3 className="text-xl font-semibold text-grey-15 mb-2">Submit Exam?</h3>
              <p className="text-grey-15/70 mb-6">
                You have answered {getAnsweredCount()} out of {questions.length} questions. 
                Are you sure you want to submit your exam?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 px-4 py-3 border border-white-95 rounded-lg text-grey-15 hover:bg-white-95 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitExam}
                  disabled={submitting}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    submitting
                      ? 'bg-orange-50/50 cursor-not-allowed text-white'
                      : 'bg-orange-50 hover:bg-orange-50/90 text-white'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Exam'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartExam;