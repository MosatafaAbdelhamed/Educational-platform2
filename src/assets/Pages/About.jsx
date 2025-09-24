import React from 'react';
import { Link } from 'react-router-dom';
import { 
  RiTeamFill, 
  RiAwardFill, 
  RiUserHeartFill, 
  RiLightbulbFill,
  RiFocus3Fill,
  RiEyeFill,
  RiHandHeartFill,
  RiStarFill,
  RiArrowRightLine,
  RiGraduationCapFill,
  RiBookOpenFill,
  RiGlobalFill,
  RiCheckLine
} from "@remixicon/react";

const About = () => {
  const stats = [
    { icon: RiGraduationCapFill, number: "50K+", label: "Students Enrolled" },
    { icon: RiBookOpenFill, number: "100+", label: "Courses Available" },
    { icon: RiAwardFill, number: "25+", label: "Expert Instructors" },
    { icon: RiGlobalFill, number: "50+", label: "Countries Served" }
  ];

  const values = [
    {
      icon: RiLightbulbFill,
      title: "Innovation",
      description: "We constantly evolve our teaching methods and technology to provide the best learning experience."
    },
    {
      icon: RiUserHeartFill,
      title: "Student-Centered",
      description: "Our students are at the heart of everything we do. We prioritize their success and growth."
    },
    {
      icon: RiHandHeartFill,
      title: "Quality",
      description: "We maintain the highest standards in course content, instruction, and student support."
    },
    {
      icon: RiFocus3Fill,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our educational platform and services."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team-1.png",
      description: "10+ years in education technology"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/images/team-2.png",
      description: "Expert in scalable learning platforms"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Curriculum",
      image: "/images/team-3.png",
      description: "Former university professor"
    },
    {
      name: "David Kim",
      role: "Student Success Manager",
      image: "/images/team-4.png",
      description: "Passionate about student outcomes"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-97 via-white to-orange-90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-grey-15 leading-tight">
              About <span className="text-orange-50">SkillBridge</span>
            </h1>
            <p className="text-lg lg:text-xl text-grey-15/70 leading-relaxed">
              We're passionate about democratizing education and making quality learning accessible to everyone, 
              everywhere. Our mission is to empower learners with the skills they need to succeed in today's 
              rapidly evolving world.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-2">{stat.number}</h3>
                <p className="text-grey-15/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white-97">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <div className="space-y-6">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                <RiFocus3Fill className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-grey-15">Our Mission</h2>
              <p className="text-lg text-grey-15/70 leading-relaxed">
                To break down barriers to quality education by providing accessible, affordable, and engaging 
                online learning experiences that prepare students for success in their chosen fields.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <RiCheckLine className="w-5 h-5 text-orange-50 flex-shrink-0" />
                  <span className="text-grey-15/80">Make education accessible to everyone</span>
                </li>
                <li className="flex items-center gap-3">
                  <RiCheckLine className="w-5 h-5 text-orange-50 flex-shrink-0" />
                  <span className="text-grey-15/80">Provide industry-relevant curriculum</span>
                </li>
                <li className="flex items-center gap-3">
                  <RiCheckLine className="w-5 h-5 text-orange-50 flex-shrink-0" />
                  <span className="text-grey-15/80">Support lifelong learning journeys</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                <RiEyeFill className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-grey-15">Our Vision</h2>
              <p className="text-lg text-grey-15/70 leading-relaxed">
                To become the world's leading online education platform, empowering millions of learners 
                to achieve their goals and transform their lives through quality education.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <RiCheckLine className="w-5 h-5 text-orange-50 flex-shrink-0" />
                  <span className="text-grey-15/80">Global leader in online education</span>
                </li>
                <li className="flex items-center gap-3">
                  <RiCheckLine className="w-5 h-5 text-orange-50 flex-shrink-0" />
                  <span className="text-grey-15/80">Innovative learning technologies</span>
                </li>
                <li className="flex items-center gap-3">
                  <RiCheckLine className="w-5 h-5 text-orange-50 flex-shrink-0" />
                  <span className="text-grey-15/80">Positive impact on communities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">Our Core Values</h2>
            <p className="text-lg text-grey-15/70 max-w-2xl mx-auto">
              These values guide everything we do and shape our commitment to our students and community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white border border-white-95 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-90 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-orange-50" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-grey-15">{value.title}</h3>
                <p className="text-grey-15/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white-97">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">Meet Our Team</h2>
            <p className="text-lg text-grey-15/70 max-w-2xl mx-auto">
              Our diverse team of experts is dedicated to providing you with the best learning experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                    <RiStarFill className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-grey-15">{member.name}</h3>
                <p className="text-orange-50 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-grey-15/70">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">Our Story</h2>
              <p className="text-lg text-grey-15/70">
                From humble beginnings to a global platform
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-grey-15 mb-4">Founded in 2020</h3>
                  <p className="text-grey-15/70 leading-relaxed">
                    SkillBridge was born out of a simple observation: quality education was becoming increasingly 
                    expensive and inaccessible. Our founders, passionate educators and technologists, set out to 
                    change this reality.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-orange-70 rounded-2xl flex items-center justify-center">
                    <RiTeamFill className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-grey-15 mb-4">Rapid Growth</h3>
                  <p className="text-grey-15/70 leading-relaxed">
                    Within just a few years, we've grown from a small startup to a platform serving tens of 
                    thousands of students worldwide. Our success is measured not just in numbers, but in the 
                    lives we've helped transform.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-70 to-orange-50 rounded-2xl flex items-center justify-center">
                    <RiAwardFill className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-grey-15 mb-4">Looking Forward</h3>
                  <p className="text-grey-15/70 leading-relaxed">
                    As we look to the future, we remain committed to innovation, accessibility, and student 
                    success. We're continuously expanding our course offerings and improving our platform to 
                    serve learners better.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-orange-70 rounded-2xl flex items-center justify-center">
                    <RiLightbulbFill className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-70">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Start your learning journey today and become part of our growing community of successful learners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="bg-white text-orange-50 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2">
                Explore Courses
                <RiArrowRightLine className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-50 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
