import React, { useState } from 'react';
import { 
  RiPhoneFill, 
  RiMailSendFill, 
  RiUserLocationLine, 
  RiFacebookBoxFill, 
  RiTwitterFill, 
  RiLinkedinFill,
  RiSendPlaneFill,
  RiCustomerService2Fill,
  RiTimeFill,
  RiMessage3Fill,
  RiCheckLine
} from "@remixicon/react";
import { contactInfo } from '../../Constant/data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: RiPhoneFill,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us for immediate assistance"
    },
    {
      icon: RiMailSendFill,
      title: "Email",
      details: ["support@skillbridge.com", "info@skillbridge.com"],
      description: "Send us an email anytime"
    },
    {
      icon: RiUserLocationLine,
      title: "Office",
      details: ["123 Education Street", "Learning City, LC 12345"],
      description: "Visit our main office"
    }
  ];

  const supportHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const socialLinks = [
    { icon: RiFacebookBoxFill, name: "Facebook", url: "#" },
    { icon: RiTwitterFill, name: "Twitter", url: "#" },
    { icon: RiLinkedinFill, name: "LinkedIn", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-white-97">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-70">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Get in Touch
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 bg-white border border-white-95 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-grey-15">{method.title}</h3>
                <div className="space-y-1 mb-3">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-grey-15/70">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-grey-15/60">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-white-95 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-grey-15 mb-2">Send us a Message</h2>
                <p className="text-grey-15/70">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiCheckLine className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-grey-15 mb-2">Message Sent!</h3>
                  <p className="text-grey-15/70">Thank you for your message. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-grey-15 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 placeholder-grey-15/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-grey-15 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 placeholder-grey-15/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-grey-15 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 placeholder-grey-15/50"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-grey-15 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-grey-15 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-50 focus:border-transparent text-grey-15 placeholder-grey-15/50 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-colors inline-flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-orange-50/50 text-white cursor-not-allowed'
                        : 'bg-orange-50 text-white hover:bg-orange-50/90'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <RiSendPlaneFill className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Support Hours */}
              <div className="bg-white rounded-2xl border border-white-95 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <RiTimeFill className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-grey-15">Support Hours</h3>
                </div>
                <div className="space-y-3">
                  {supportHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white-95 last:border-b-0">
                      <span className="font-medium text-grey-15">{schedule.day}</span>
                      <span className="text-grey-15/70">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-white rounded-2xl border border-white-95 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <RiCustomerService2Fill className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-grey-15">Quick Help</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-97 rounded-xl">
                    <h4 className="font-semibold text-grey-15 mb-2">Frequently Asked Questions</h4>
                    <p className="text-grey-15/70 text-sm mb-3">
                      Check our FAQ section for quick answers to common questions.
                    </p>
                    <a href="#" className="text-orange-50 font-medium text-sm hover:text-orange-50/80">
                      View FAQ →
                    </a>
                  </div>
                  <div className="p-4 bg-orange-97 rounded-xl">
                    <h4 className="font-semibold text-grey-15 mb-2">Live Chat Support</h4>
                    <p className="text-grey-15/70 text-sm mb-3">
                      Chat with our support team for immediate assistance.
                    </p>
                    <button className="text-orange-50 font-medium text-sm hover:text-orange-50/80">
                      Start Chat →
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl border border-white-95 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <RiMessage3Fill className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-grey-15">Follow Us</h3>
                </div>
                <p className="text-grey-15/70 mb-4">
                  Stay connected with us on social media for updates, tips, and community discussions.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-12 h-12 bg-white border border-white-95 rounded-xl flex items-center justify-center hover:bg-orange-50 hover:border-orange-50 hover:text-white transition-colors"
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-grey-15 mb-4">Visit Our Office</h2>
            <p className="text-lg text-grey-15/70 max-w-2xl mx-auto">
              Come visit us at our main office. We'd love to meet you in person!
            </p>
          </div>
          
          <div className="bg-white border border-white-95 rounded-2xl overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-orange-97 to-orange-90 flex items-center justify-center">
              <div className="text-center">
                <RiUserLocationLine className="w-16 h-16 text-orange-50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-grey-15 mb-2">Interactive Map</h3>
                <p className="text-grey-15/70">123 Education Street, Learning City, LC 12345</p>
                <button className="mt-4 px-6 py-2 bg-orange-50 text-white rounded-lg hover:bg-orange-50/90 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
