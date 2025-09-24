import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  RiArrowLeftLine, 
  RiEditLine, 
  RiDeleteBinLine,
  RiQuestionAnswerLine,
  RiTimeFill,
  RiStarFill,
  RiCheckLine,
  RiCloseLine,
  RiBookOpenLine,
  RiAlertLine
} from "@remixicon/react";

const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchQuestion();
    }
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://edu-master-psi.vercel.app/question/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setQuestion(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch question details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://edu-master-psi.vercel.app/question/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      navigate('/questions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete question');
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-50 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-15/70">Loading question details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiAlertLine className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-grey-15 mb-2">Error Loading Question</h3>
          <p className="text-grey-15/70 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={fetchQuestion}
              className="primary-btn"
            >
              Try Again
            </button>
            <Link to="/questions" className="secondary-btn">
              Back to Questions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-white-97 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-90 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiQuestionAnswerLine className="w-8 h-8 text-orange-50" />
          </div>
          <h3 className="text-xl font-semibold text-grey-15 mb-2">Question Not Found</h3>
          <p className="text-grey-15/70 mb-6">The question you're looking for doesn't exist.</p>
          <Link to="/questions" className="primary-btn">
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header Section */}
      <section className="py-8 bg-white border-b border-white-95">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/questions" 
                className="w-10 h-10 bg-white-95 rounded-lg flex items-center justify-center hover:bg-white-90 transition-colors"
              >
                <RiArrowLeftLine className="w-5 h-5 text-grey-15" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-grey-15">Question Details</h1>
                <p className="text-grey-15/70">View and manage question information</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                to={`/questions/edit/${id}`}
                className="secondary-btn flex items-center gap-2"
              >
                <RiEditLine className="w-4 h-4" />
                Edit Question
              </Link>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-50 text-red-500 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <RiDeleteBinLine className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Question Content */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-white-95 overflow-hidden">
            {/* Question Header */}
            <div className="p-8 border-b border-white-95">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-grey-15 mb-4 leading-relaxed">
                    {question.text}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-grey-15/70">
                    <div className="flex items-center gap-2">
                      <RiQuestionAnswerLine className="w-4 h-4" />
                      <span className="capitalize">{question.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiStarFill className="w-4 h-4" />
                      <span>{question.points || 1} point{question.points !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RiTimeFill className="w-4 h-4" />
                      <span>Created {new Date(question.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Options */}
            {question.type === 'multiple-choice' && question.options && (
              <div className="p-8">
                <h3 className="text-lg font-semibold text-grey-15 mb-6">Answer Options</h3>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        option === question.correctAnswer 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-white-95 bg-white-97'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          option === question.correctAnswer 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white-90 text-grey-15/70'
                        }`}>
                          {option === question.correctAnswer ? (
                            <RiCheckLine className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-medium">{String.fromCharCode(65 + index)}</span>
                          )}
                        </div>
                        <span className={`font-medium ${
                          option === question.correctAnswer ? 'text-green-700' : 'text-grey-15'
                        }`}>
                          {option}
                        </span>
                        {option === question.correctAnswer && (
                          <span className="ml-auto px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                            Correct Answer
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="p-8 border-t border-white-95 bg-white-97">
              <h3 className="text-lg font-semibold text-grey-15 mb-4">Additional Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-grey-15 mb-2">Question ID</h4>
                  <p className="text-grey-15/70 font-mono text-sm">{question._id}</p>
                </div>
                {question.exam && (
                  <div>
                    <h4 className="font-medium text-grey-15 mb-2">Associated Exam</h4>
                    <p className="text-grey-15/70 font-mono text-sm">{question.exam}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-grey-15 mb-2">Question Type</h4>
                  <p className="text-grey-15/70 capitalize">{question.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-grey-15 mb-2">Points</h4>
                  <p className="text-grey-15/70">{question.points || 1}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiDeleteBinLine className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-grey-15 mb-2">Delete Question</h3>
              <p className="text-grey-15/70 mb-6">
                Are you sure you want to delete this question? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="secondary-btn"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
