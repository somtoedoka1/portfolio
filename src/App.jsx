import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight, Code, Zap, Sparkles, Terminal, Rocket, Book, Music, Trophy, Target, Coffee, Award, Package, Clock, TrendingUp } from 'lucide-react';

export default function PersonalWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);

  const roles = ["Student", "Developer", "Problem-Solver", "Creator"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fullText = "Building clean, fast digital experiences";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Simpler particle animation like version 2
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      const sections = ['home', 'now', 'about', 'process', 'highlights', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'now', label: 'Now' },
    { id: 'about', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div 
        className="fixed w-6 h-6 border-2 border-purple-500 rounded-full pointer-events-none hidden md:block transition-all duration-100 ease-out z-50 mix-blend-difference"
        style={{ 
          left: mousePosition.x - 12, 
          top: mousePosition.y - 12,
        }}
      />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#home" onClick={() => scrollToSection('home')} className="text-2xl font-bold flex items-center space-x-2 group">
              <Terminal className="text-purple-500 group-hover:text-pink-500 transition-colors" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {"<Somto>"}
              </span>
            </a>
            
            <div className="hidden md:flex space-x-1 bg-slate-800/50 backdrop-blur-sm rounded-full px-2 py-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
              <div className="px-6 py-4 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'text-gray-300 hover:bg-slate-800'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="max-w-5xl text-center" data-aos="fade-up">
            <div className="mb-8">
              <Sparkles className="text-purple-500 animate-pulse mx-auto" size={48} />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Somtochukwu
              </span>
            </h1>
            
            <div className="text-3xl md:text-4xl text-gray-300 mb-4 font-bold">
              <span className="text-purple-400 transition-all duration-500">
                {roles[currentRole]}
              </span>
            </div>

            <div className="text-xl md:text-2xl text-gray-400 mb-12 h-12 font-mono">
              {typedText}
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </div>

            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Computer Science student at Fisk University. I solve problems with curiosity and discipline, building elegant solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <span>View My Work</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('now')}
                className="group border-2 border-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>What I'm Doing Now</span>
                <Clock className="group-hover:rotate-12 transition-transform" size={20} />
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              {[
                { Icon: Github, link: 'https://github.com/somtoedoka1' },
                { Icon: Linkedin, link: 'https://www.linkedin.com/in/somtochukwu-chukwudi-edoka-14b802273/' },
                { Icon: Mail, link: 'mailto:somtoedoka1@gmail.com' }
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 p-4 rounded-full transition-all hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Now Page */}
        <section id="now" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl w-full">
            <div className="text-center mb-12">
              <Clock className="text-purple-500 mx-auto mb-4" size={48} />
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  What I'm Doing Now
                </span>
              </h2>
              <p className="text-gray-400 text-lg">Current focus & active goals</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Book,
                  title: "Currently Learning",
                  items: ["Advanced Data Structures & Algorithms", "Cloud Architecture (AWS)", "React Performance Optimization", "System Design Principles"],
                  color: "from-purple-600 to-purple-400"
                },
                {
                  icon: Code,
                  title: "Building Right Now",
                  items: ["Manold E-Commerce Platform", "Nighteye Accessibility App", "Lumina Wellness Platform", "Personal Portfolio v2"],
                  color: "from-pink-600 to-pink-400"
                },
                {
                  icon: Target,
                  title: "Short-term Goals",
                  items: ["Land a Summer 2025 SWE Internship", "Contribute to 3 open source projects", "Master TypeScript & Next.js", "Build 2 more production apps"],
                  color: "from-orange-600 to-orange-400"
                },
                {
                  icon: TrendingUp,
                  title: "Improving Myself",
                  items: ["Technical writing & documentation", "System architecture thinking", "Public speaking & presentation", "Time management & productivity"],
                  color: "from-blue-600 to-blue-400"
                }
              ].map(({ icon: Icon, title, items, color }, i) => (
                <div 
                  key={i}
                  className="group bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/60 transition-all hover:scale-105 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">{title}</h3>
                  <ul className="space-y-3">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start space-x-3 text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm hover:scale-105 transition-transform">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">My Story</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I'm a Computer Science student at Fisk University (Class of 2027), passionate about creating digital experiences that solve real problems.
                  </p>
                  <p>
                    As President of the Chess Club and a DJ for campus events, I balance technical excellence with community building. I believe in the power of clean code, thoughtful design, and continuous learning.
                  </p>
                  <p>
                    My journey spans from building production apps used by millions to providing frontline tech support—teaching me to think from both the user's and developer's perspective.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm hover:scale-105 transition-transform">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">Beyond Code</h3>
                <div className="space-y-4">
                  {[
                    { icon: Music, text: "Fisk Activities Board DJ - Curating vibes for campus events" },
                    { icon: Trophy, text: "President of Chess Club - Strategy on and off the board" },
                    { icon: Award, text: "Royal Court Representative - Leading by example" },
                    { icon: Coffee, text: "Always learning something new - Currently: Cloud Architecture" }
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start space-x-4 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Icon size={20} />
                      </div>
                      <p className="text-gray-300 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-purple-400 text-center">Tech Stack & Tools</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Frontend", skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "SASS", "Tailwind CSS"] },
                  { title: "Backend & Tools", skills: ["Node.js", "Python", "Java", "Git", "Docker", "AWS"] },
                  { title: "Design & Testing", skills: ["Figma", "Responsive Design", "Jest", "Storybook", "UI/UX"] }
                ].map(({ title, skills }) => (
                  <div key={title}>
                    <h4 className="font-semibold mb-3 text-pink-400">{title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 px-3 py-1.5 rounded-full text-sm hover:scale-110 hover:border-purple-500/60 transition-all cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <Zap className="text-purple-500 mx-auto mb-4" size={48} />
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  How I Work
                </span>
              </h2>
              <p className="text-gray-400 text-lg">My approach to solving problems</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Problem-Solving Approach",
                  steps: [
                    "Understand the root problem, not just symptoms",
                    "Break down complex issues into manageable pieces",
                    "Research existing solutions and best practices",
                    "Build iteratively with continuous testing",
                    "Optimize for maintainability and scale"
                  ],
                  color: "from-purple-600 to-purple-400"
                },
                {
                  title: "Learning Process",
                  steps: [
                    "Start with fundamentals and core concepts",
                    "Build projects to solidify understanding",
                    "Learn from code reviews and mentorship",
                    "Document everything for future reference",
                    "Share knowledge through teaching others"
                  ],
                  color: "from-pink-600 to-pink-400"
                },
                {
                  title: "Development Workflow",
                  steps: [
                    "Plan architecture before writing code",
                    "Write clean, readable, maintainable code",
                    "Test early and test often",
                    "Optimize performance where it matters",
                    "Deploy with confidence using CI/CD"
                  ],
                  color: "from-orange-600 to-orange-400"
                },
                {
                  title: "Communication Style",
                  steps: [
                    "Communicate clearly and frequently",
                    "Active listener who values all perspectives",
                    "Take ownership and meet deadlines",
                    "Ask questions early to avoid confusion",
                    "Give and receive constructive feedback"
                  ],
                  color: "from-blue-600 to-blue-400"
                }
              ].map(({ title, steps, color }, i) => (
                <div 
                  key={i}
                  className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/60 transition-all hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl mb-6 flex items-center justify-center`}>
                    <span className="text-2xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-purple-400">{title}</h3>
                  <ul className="space-y-3">
                    {steps.map((step, j) => (
                      <li key={j} className="flex items-start space-x-3 text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section id="highlights" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <Trophy className="text-purple-500 mx-auto mb-4 animate-pulse" size={48} />
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Proud Wins
                </span>
              </h2>
              <p className="text-gray-400 text-lg">Key achievements & milestones</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { number: "1M+", label: "Users Reached", desc: "VBank app downloads", color: "from-purple-600 to-purple-400" },
                { number: "100+", label: "Weekly Clients", desc: "Lumina Wellness platform", color: "from-pink-600 to-pink-400" },
                { number: "50+", label: "Designers", desc: "On Manold marketplace", color: "from-orange-600 to-orange-400" },
                { number: "20%", label: "Performance Boost", desc: "V-Bank App Core Web Vitals improvement", color: "from-blue-600 to-blue-400" },
                { number: "25%", label: "Faster Support", desc: "IT turnaround time reduction", color: "from-green-600 to-green-400" },
                { number: "2027", label: "Graduation Year", desc: "Fisk University CS degree", color: "from-purple-600 to-pink-600" }
              ].map(({ number, label, desc, color }, i) => (
                <div 
                  key={i}
                  className="group bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/60 transition-all hover:scale-110 hover:-translate-y-2 text-center cursor-pointer"
                >
                  <div className={`text-5xl font-bold mb-2 bg-gradient-to-br ${color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                    {number}
                  </div>
                  <div className="text-xl font-semibold mb-2 text-white">{label}</div>
                  <div className="text-gray-400 text-sm">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 hidden md:block" />
              
              <div className="space-y-12">
                {[
                  {
                    year: 'Jan 2025 - Present',
                    title: 'Web Developer',
                    company: 'Lumina Wellness Infusions',
                    description: 'Developing and deploying a React-based platform that has transformed the booking experience for over 100 weekly clients.',
                    achievements: [
                      'Built responsive platform with mobile-first design',
                      'Improved booking efficiency by 40%',
                      'Enhanced accessibility across all devices',
                      'Optimized cross-browser performance'
                    ],
                    color: 'purple'
                  },
                  {
                    year: 'Jan 2024 - Jun 2024',
                    title: 'Frontend Development Intern',
                    company: 'VFD Bank',
                    description: 'Contributed to the VBank app used by over 1 million customers nationwide, focusing on performance and user experience.',
                    achievements: [
                      'Improved Core Web Vitals & load speed by 20%',
                      'Built responsive React pages with HTML/CSS/SASS',
                      'Translated Figma designs into production UI',
                      'Shipped features to 1M+ active users'
                    ],
                    color: 'pink'
                  },
                  {
                    year: 'Jul 2021 - Present',
                    title: 'Junior Tech',
                    company: 'Computer House',
                    description: 'Providing comprehensive IT support and technical solutions, improving service quality and customer satisfaction.',
                    achievements: [
                      'Reduced service turnaround time by 25%',
                      'Performed complex system repairs & maintenance',
                      'Delivered exceptional customer support',
                      'Managed system installations & configurations'
                    ],
                    color: 'orange'
                  }
                ].map((job, index) => (
                  <div key={index} className="relative pl-20 md:pl-24 group">
                    <div className={`absolute left-6 top-0 w-5 h-5 bg-${job.color}-500 rounded-full border-4 border-slate-900 group-hover:scale-150 transition-all hidden md:block shadow-lg`} />
                    
                    <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 md:p-8 hover:border-purple-500/60 hover:scale-105 hover:-translate-y-2 transition-all cursor-pointer backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-purple-400 mb-1">{job.title}</h3>
                          <p className="text-xl text-gray-300 font-semibold">{job.company}</p>
                        </div>
                        <span className="text-gray-400 text-sm md:text-base mt-2 md:mt-0 bg-purple-900/30 px-4 py-1 rounded-full">
                          {job.year}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4 leading-relaxed">{job.description}</p>
                      <div className="space-y-2">
                        {job.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center space-x-2 text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <Package className="text-purple-500 mx-auto mb-4" size={48} />
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-gray-400 text-lg">Building solutions that matter</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: 'Manold',
                  subtitle: 'Personal E-Commerce Startup',
                  description: 'Full-featured marketplace connecting 50+ designers with customers. Built with React and Tailwind CSS featuring seamless checkout and integrated Stripe payments.',
                  tech: ['React', 'TailwindCSS', 'Stripe', 'Component Architecture'],
                  gradient: 'from-purple-500 to-pink-500',
                  features: [
                    'Responsive storefront design',
                    'Integrated payment processing',
                    'Scalable component architecture',
                    'Product showcase for 50+ designers'
                  ]
                },
                {
                  title: 'Nighteye',
                  subtitle: 'Assistive Vision App',
                  description: 'Accessibility-first application designed for visually impaired users to see through their phone using AI-powered object detection and text-to-speech.',
                  tech: ['React', 'Cloud Vision API', 'Text-to-Speech', 'Accessibility'],
                  gradient: 'from-blue-500 to-purple-500',
                  features: [
                    'Real-time object detection',
                    'Text-to-speech feedback',
                    'Accessibility-first UI design',
                    'Cloud Vision API integration'
                  ]
                },
                {
                  title: 'Lumina Wellness Platform',
                  subtitle: 'Healthcare Booking System',
                  description: 'Modern wellness platform serving 100+ weekly clients with streamlined booking, mobile-first design, and enhanced accessibility.',
                  tech: ['React', 'Responsive Design', 'Accessibility', 'Performance'],
                  gradient: 'from-green-500 to-blue-500',
                  features: [
                    'Efficient booking system',
                    'Mobile-first responsive design',
                    'Cross-browser compatibility',
                    'Enhanced accessibility features'
                  ]
                },
                {
                  title: 'VBank Features',
                  subtitle: 'Banking Application',
                  description: 'Production-ready features for VBank app used by 1M+ customers. Optimized performance and built responsive UI components from Figma designs.',
                  tech: ['React', 'HTML/CSS', 'SASS', 'Performance Optimization'],
                  gradient: 'from-orange-500 to-red-500',
                  github: 'https://github.com/somtoedoka1',
                  features: [
                    'Shipped to 1M+ users',
                    '20% performance improvement',
                    'Responsive UI components',
                    'Production-grade code quality'
                  ]
                },
                {
                  title: 'Open Interface',
                  subtitle: 'AI-Powered Computer Control',
                  description: 'Self-drives your computer by sending natural language requests to an LLM backend (GPT-4o, Gemini, etc.) which determines the required steps, then automatically executes them via simulated keyboard and mouse input.',
                  tech: ['Python', 'GPT-4o', 'Gemini', 'Computer Vision', 'LLM'],
                  gradient: 'from-cyan-500 to-blue-500',
                  github: 'https://github.com/AmberSahdev/Open-Interface',
                  features: [
                    'Natural language computer control',
                    'Multi-LLM backend support (GPT-4o, Gemini)',
                    'Automated keyboard & mouse simulation',
                    'Screenshot-based course correction'
                  ]
                }
              ].map((project, index) => (
                <div 
                  key={index} 
                  className="group relative bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/60 transition-all cursor-pointer overflow-hidden hover:scale-105 hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform flex items-center justify-center`}>
                      <Code size={32} />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-2 text-purple-400 group-hover:text-pink-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-purple-300 mb-4">{project.subtitle}</p>
                    <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-purple-400 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start space-x-2 text-gray-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors group/btn">
                          <Github size={18} />
                          <span className="group-hover/btn:translate-x-1 transition-transform">Code</span>
                        </a>
                      ) : (
                        <button className="flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors group/btn">
                          <Github size={18} />
                          <span className="group-hover/btn:translate-x-1 transition-transform">Code</span>
                        </button>
                      )}
                      <button className="flex items-center space-x-2 text-purple-400 hover:text-pink-400 transition-colors group/btn">
                        <ExternalLink size={18} />
                        <span className="group-hover/btn:translate-x-1 transition-transform">Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full text-center">
            <div className="mb-12">
              <Rocket className="text-purple-500 mx-auto mb-4 animate-bounce" size={48} />
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </span>
              </h2>
              <p className="text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Have a project in mind? Looking for an intern? Let's turn ideas into reality.
              </p>
              <p className="text-lg text-gray-400 mb-12">
                📍 Based in Nashville, TN • Open to remote opportunities
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                { Icon: Mail, label: 'Email Me', link: 'mailto:somtoedoka1@gmail.com', color: 'from-purple-600 to-purple-400' },
                { Icon: Linkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/somtochukwu-chukwudi-edoka-14b802273/', color: 'from-blue-600 to-blue-400' },
                { Icon: Github, label: 'GitHub', link: 'https://github.com/somtoedoka1', color: 'from-pink-600 to-pink-400' }
              ].map(({ Icon, label, link, color }, i) => (
                <a
                  key={i}
                  href={link}
                  target={link.startsWith('http') ? '_blank' : undefined}
                  rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group flex items-center space-x-3 bg-gradient-to-r ${color} px-8 py-4 rounded-full font-semibold hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 transition-all`}
                >
                  <Icon className="group-hover:rotate-12 transition-transform" size={24} />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 mb-12 max-w-2xl mx-auto hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Quick Response Promise</h3>
              <p className="text-gray-300 leading-relaxed">
                I respond to all emails within 24 hours. Recruiters, collaborators, or just want to chat about tech. I'd love to hear from you.
              </p>
            </div>

            <a 
              href="mailto:somtoedoka1@gmail.com"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-12 py-5 rounded-full font-bold text-xl hover:scale-110 transition-all hover:shadow-2xl hover:shadow-purple-500/50"
            >
              Send Me an Email ✨
            </a>
          </div>
        </section>

        {/* Footer with Easter Egg */}
        <footer className="relative bg-slate-900/50 border-t border-purple-500/20 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-400 mb-4">
              Designed & Built by <span className="text-purple-400 font-semibold">Somtochukwu Chukwudi-Edoka</span>
            </p>
            <p className="text-gray-500 text-sm mb-6">
              © 2025 • Crafted with React, Tailwind CSS, and lots of ☕
            </p>
            <p className="text-gray-600 text-xs hover:text-purple-400 transition-colors cursor-default">
              🎮 Fun fact: I'm also a Chess strategist and campus DJ
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}