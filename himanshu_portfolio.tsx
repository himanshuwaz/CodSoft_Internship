import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Code, Database, Brain, Users, Award, Calendar, ChevronRight, ExternalLink, Download } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Full Stack Developer',
    'AI/ML Enthusiast', 
    'BCA Student',
    'Microsoft Learn Ambassador',
    'Software Engineer'
  ];

  useEffect(() => {
    const text = roles[currentRole];
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => {
          setTypedText('');
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [currentRole]);

  const skills = [
    { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap'], icon: <Code className="w-6 h-6" /> },
    { category: 'Backend', items: ['Python', 'Flask', 'Node.js', 'Express.js'], icon: <Database className="w-6 h-6" /> },
    { category: 'AI/ML', items: ['Prompt Engineering', 'Generative AI', 'OpenAI API', 'Offline LLMs'], icon: <Brain className="w-6 h-6" /> },
    { category: 'Tools', items: ['MongoDB', 'Git', 'GitHub', 'Microsoft Copilot'], icon: <Users className="w-6 h-6" /> }
  ];

  const experiences = [
    {
      company: 'SWAMI LOGIPOOL INFOTECH',
      role: 'Engineer Intern',
      duration: 'June 2025 - Present',
      location: 'Pune, Maharashtra, India',
      description: 'Selected for a 6-Month Software Engineering Incubation Program focusing on full-stack development and real-world projects.'
    },
    {
      company: 'VaultofCodes',
      role: 'Web Development Intern',
      duration: 'July 2025 - August 2025',
      location: 'Pune, Maharashtra, India',
      description: 'Completed hands-on web development projects with positive evaluation as "sincere, hardworking, technically sound and result oriented".'
    }
  ];

  const certifications = [
    'Microsoft Career Essentials in Generative AI',
    'Microsoft Office Specialist - Word, Excel, PowerPoint',
    'Web Dev Internship Certificate - Vault of Codes',
    'Infosys Web Technologies Project Contributor'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Himanshu Waja
            </h1>
            <div className="hidden md:flex space-x-8">
              {['Hero', 'About', 'Skills', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`hover:text-blue-400 transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold">
              HW
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Himanshu
            </span>
          </h1>
          
          <div className="text-2xl md:text-3xl mb-8 h-12">
            <span className="text-gray-300">I'm a </span>
            <span className="text-blue-400 font-semibold">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Building Ideas into Real-World Tech Solutions! Passionate about turning innovative concepts 
            into high-impact digital experiences through full-stack development and AI/ML technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveSection('experience')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              View My Work <ChevronRight className="w-4 h-4" />
            </button>
            <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download CV
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Software Developer & Tech Enthusiast</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm a passionate BCA student and rising tech leader who thrives on turning ideas into 
                high-impact digital solutions. With expertise spanning from web development to AI/ML, 
                I'm constantly pushing boundaries and leveling up my skills.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Currently serving as a Microsoft Learn Student Ambassador and working as a Trainee Engineer 
                at Logipool Infotech, I'm focused on building a strong foundation in software engineering 
                while exploring the exciting possibilities of artificial intelligence.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-gray-300">Akola, Maharashtra, India</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Role</span>
                </div>
                <p className="text-gray-300">Microsoft Learn Student Ambassador</p>
              </div>
              
              <div className="bg-gradient-to-r from-pink-600/20 to-blue-600/20 p-6 rounded-lg border border-pink-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <span className="font-semibold">Education</span>
                </div>
                <p className="text-gray-300">BCA @ SGBAU (2023-2026)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-400">{skill.icon}</div>
                  <h3 className="text-xl font-semibold">{skill.category}</h3>
                </div>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Experience</h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">{exp.company}</h3>
                    <h4 className="text-xl font-semibold mb-2">{exp.role}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-400 font-semibold">{exp.duration}</p>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
          
          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Certifications & Achievements</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 p-4 rounded-lg border border-green-500/20"
                >
                  <Award className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect!</h2>
          <p className="text-xl text-gray-300 mb-12">
            Open to internships, freelance gigs, and full-time roles in Software Development, AI/ML, or Web Tech.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:himanshuwaz@gmail.com"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600/20 to-pink-600/20 p-6 rounded-xl border border-red-500/20 hover:border-red-400 transition-all hover:transform hover:scale-105"
            >
              <Mail className="w-6 h-6 text-red-400" />
              <span>Email</span>
            </a>
            
            <a
              href="tel:+918329029807"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/20 hover:border-green-400 transition-all hover:transform hover:scale-105"
            >
              <Phone className="w-6 h-6 text-green-400" />
              <span>Call</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/himanshu-waja-8488b0350"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/20 hover:border-blue-400 transition-all hover:transform hover:scale-105"
            >
              <Linkedin className="w-6 h-6 text-blue-400" />
              <span>LinkedIn</span>
            </a>
            
            <a
              href="https://github.com/himanshuwaz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400 transition-all hover:transform hover:scale-105"
            >
              <Github className="w-6 h-6 text-purple-400" />
              <span>GitHub</span>
            </a>
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
            <p className="text-lg font-semibold mb-4">Ready to collaborate?</p>
            <p className="text-gray-300">
              DM-friendly & always open to learning, collaboration, and innovation! 
              Let's build something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black/40 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Himanshu Waja. Built with React & passion for innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;