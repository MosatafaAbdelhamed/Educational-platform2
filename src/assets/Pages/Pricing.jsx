import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiCheckLine, 
  RiCloseLine,
  RiStarFill,
  RiArrowRightLine,
  RiShieldCheckFill,
  RiCustomerService2Fill,
  RiVipCrownFill,
  RiBookOpenFill,
  RiTimeFill,
  RiUserStarFill
} from "@remixicon/react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: 1,
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        "Access to 5 basic courses",
        "Community support",
        "Basic progress tracking",
        "Mobile app access",
        "Email support"
      ],
      limitations: [
        "Limited course selection",
        "No certificates",
        "No priority support"
      ],
      cta: "Get Started Free",
      ctaLink: "/register"
    },
    {
      id: 2,
      name: "Pro",
      description: "Best for serious learners",
      monthlyPrice: 29,
      annualPrice: 290,
      popular: true,
      features: [
        "Access to all courses",
        "Downloadable materials",
        "Completion certificates",
        "Priority support",
        "Advanced progress tracking",
        "Mobile app access",
        "Community forums",
        "Live Q&A sessions"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      ctaLink: "/register"
    },
    {
      id: 3,
      name: "Enterprise",
      description: "For teams and organizations",
      monthlyPrice: 99,
      annualPrice: 990,
      popular: false,
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Custom learning paths",
        "Analytics and reporting",
        "Dedicated account manager",
        "Custom branding",
        "API access",
        "White-label solution",
        "24/7 phone support",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Contact Sales",
      ctaLink: "/contact"
    }
  ];

  const faq = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! Our Pro plan comes with a 7-day free trial. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! Students with valid .edu email addresses can get 50% off any paid plan. Contact our support team for verification."
    },
    {
      question: "What's included in Enterprise support?",
      answer: "Enterprise customers get dedicated account management, priority support, custom integrations, and white-label options."
    }
  ];

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-70">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Choose the plan that fits your learning goals. All plans include our core features with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex justify-center mb-12">
            <div className="flex items-center bg-white border border-white-95 rounded-xl p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !isAnnual 
                    ? 'bg-orange-50 text-white' 
                    : 'text-grey-15 hover:text-orange-50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isAnnual 
                    ? 'bg-orange-50 text-white' 
                    : 'text-grey-15 hover:text-orange-50'
                }`}
              >
                Annual
                <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-orange-50 scale-105' 
                    : 'border-white-95 hover:border-orange-50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-50 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <RiStarFill className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-grey-15 mb-2">{plan.name}</h3>
                    <p className="text-grey-15/70 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-grey-15">
                          ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-grey-15/60 ml-2">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      {isAnnual && plan.monthlyPrice > 0 && (
                        <p className="text-sm text-grey-15/60 mt-2">
                          ${Math.round(plan.annualPrice / 12)}/month billed annually
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <RiCheckLine className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-grey-15/80">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-3 opacity-60">
                        <div className="w-5 h-5 bg-grey-15/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <RiCloseLine className="w-3 h-3 text-grey-15/60" />
                        </div>
                        <span className="text-grey-15/60">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={plan.ctaLink}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-colors inline-flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-orange-50 text-white hover:bg-orange-50/90'
                        : 'bg-white border-2 border-orange-50 text-orange-50 hover:bg-orange-50 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                    <RiArrowRightLine className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">
              Compare All Features
            </h2>
            <p className="text-lg text-grey-15/70 max-w-2xl mx-auto">
              See what's included in each plan to make the best choice for your learning journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-white-95 overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-6 bg-white-97 border-b border-white-95">
                <div className="font-semibold text-grey-15">Features</div>
                <div className="text-center font-semibold text-grey-15">Free</div>
                <div className="text-center font-semibold text-orange-50">Pro</div>
                <div className="text-center font-semibold text-grey-15">Enterprise</div>
              </div>
              
              {[
                { feature: "Course Access", free: "5 courses", pro: "All courses", enterprise: "All courses + custom" },
                { feature: "Certificates", free: "❌", pro: "✅", enterprise: "✅ + Custom" },
                { feature: "Support", free: "Email", pro: "Priority", enterprise: "24/7 Phone" },
                { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom Reports" },
                { feature: "Team Management", free: "❌", pro: "❌", enterprise: "✅" },
                { feature: "API Access", free: "❌", pro: "❌", enterprise: "✅" }
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-6 border-b border-white-95 last:border-b-0">
                  <div className="font-medium text-grey-15">{item.feature}</div>
                  <div className="text-center text-grey-15/70">{item.free}</div>
                  <div className="text-center text-grey-15/70">{item.pro}</div>
                  <div className="text-center text-grey-15/70">{item.enterprise}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white-97">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-grey-15/70 max-w-2xl mx-auto">
              Join our community of successful learners and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl border border-white-95">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RiShieldCheckFill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-grey-15">Secure & Reliable</h3>
              <p className="text-grey-15/70">Your data is protected with enterprise-grade security</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-white-95">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RiCustomerService2Fill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-grey-15">24/7 Support</h3>
              <p className="text-grey-15/70">Get help whenever you need it from our expert team</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-white-95">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RiVipCrownFill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-grey-15">Premium Quality</h3>
              <p className="text-grey-15/70">Industry-leading courses taught by experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-grey-15/70 max-w-2xl mx-auto">
              Got questions? We've got answers. If you can't find what you're looking for, contact us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white border border-white-95 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-grey-15 mb-3">{item.question}</h3>
                <p className="text-grey-15/70 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-70">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Join thousands of students who are already advancing their careers with our courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-orange-50 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2">
                Start Free Trial
                <RiArrowRightLine className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-50 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
