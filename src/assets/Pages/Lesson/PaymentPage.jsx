import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  RiMoneyDollarCircleLine,
  RiLockLine,
  RiCheckLine,
  RiErrorWarningFill,
  RiArrowLeftLine,
  RiBankCardLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiVideoLine
} from "@remixicon/react";

const PaymentPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    fetchLessonDetails();
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

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `https://edu-master-psi.vercel.app/lesson/pay/${lessonId}`,
        {},
        { headers: { token } }
      );

      if (response.data.paymentUrl) {
        setPaymentUrl(response.data.paymentUrl);
        // Redirect to payment URL
        window.location.href = response.data.paymentUrl;
      } else {
        setError('Payment URL not received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
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
            <div>
              <h1 className="text-3xl font-bold text-grey-15 mb-2">Payment Required</h1>
              <p className="text-grey-15/70">Complete your payment to access this premium lesson.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Lesson Details */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8">
              <h2 className="text-2xl font-bold text-grey-15 mb-6 flex items-center gap-3">
                <RiVideoLine className="w-6 h-6 text-orange-50" />
                Lesson Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-grey-15 mb-2">{lesson.title}</h3>
                  <p className="text-grey-15/70 leading-relaxed">{lesson.description}</p>
                </div>

                <div className="bg-orange-90 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <RiMoneyDollarCircleLine className="w-6 h-6 text-orange-50" />
                    <div>
                      <p className="font-semibold text-grey-15">Premium Content</p>
                      <p className="text-sm text-grey-15/70">This lesson requires payment to access</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-grey-15/70">
                    <RiCheckLine className="w-4 h-4 text-green-500" />
                    <span>High-quality video content</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-grey-15/70">
                    <RiCheckLine className="w-4 h-4 text-green-500" />
                    <span>Expert instruction</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-grey-15/70">
                    <RiCheckLine className="w-4 h-4 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-grey-15/70">
                    <RiCheckLine className="w-4 h-4 text-green-500" />
                    <span>Mobile and desktop compatible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-xl shadow-sm border border-white-95 p-8">
              <h2 className="text-2xl font-bold text-grey-15 mb-6 flex items-center gap-3">
                <RiBankCardLine className="w-6 h-6 text-orange-50" />
                Payment Information
              </h2>

              <div className="space-y-6">
                {/* Price Display */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-70 rounded-lg p-6 text-center">
                  <div className="text-white">
                    <p className="text-sm opacity-90 mb-1">Total Amount</p>
                    <p className="text-4xl font-bold">${lesson.price}</p>
                    <p className="text-sm opacity-90 mt-1">USD</p>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <RiShieldCheckLine className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800 mb-1">Secure Payment</p>
                      <p className="text-green-700">
                        Your payment information is encrypted and processed securely. 
                        We never store your credit card details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-grey-15 mb-4">Accepted Payment Methods</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 border border-white-95 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <RiBankCardLine className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-grey-15">Credit Card</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-white-95 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <RiMoneyDollarCircleLine className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-grey-15">Debit Card</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 ${
                    paymentLoading
                      ? 'bg-orange-50/50 cursor-not-allowed text-white'
                      : 'bg-orange-50 hover:bg-orange-50/90 text-white'
                  }`}
                >
                  {paymentLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <RiLockLine className="w-5 h-5" />
                      Pay ${lesson.price} - Secure Checkout
                    </>
                  )}
                </button>

                {/* Additional Info */}
                <div className="text-center text-sm text-grey-15/60">
                  <p>By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
                  <p className="mt-1">You'll be redirected to a secure payment page.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-white-95 p-8">
            <h2 className="text-2xl font-bold text-grey-15 mb-6 text-center">Why Choose Our Platform?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiShieldCheckLine className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold text-grey-15 mb-2">Secure Payments</h3>
                <p className="text-sm text-grey-15/70">
                  All transactions are encrypted and processed through secure payment gateways.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiTimeLine className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-grey-15 mb-2">Instant Access</h3>
                <p className="text-sm text-grey-15/70">
                  Get immediate access to your lesson content after successful payment.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RiVideoLine className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="font-semibold text-grey-15 mb-2">Quality Content</h3>
                <p className="text-sm text-grey-15/70">
                  Expert-created lessons with high-quality video content and materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
