'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Animated floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-teal-400/30 to-cyan-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated molecule shapes
function MoleculeShapes() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="moleculeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Hexagon structures */}
      {[150, 400, 700, 950].map((x, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: i * 0.3, duration: 1 }}
        >
          <motion.polygon
            points={`${x},${150 + i * 80} ${x + 40},${130 + i * 80} ${x + 80},${150 + i * 80} ${x + 80},${190 + i * 80} ${x + 40},${210 + i * 80} ${x},${190 + i * 80}`}
            fill="none"
            stroke="url(#moleculeGrad)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
          <motion.circle
            cx={x + 40}
            cy={130 + i * 80}
            r="4"
            fill="url(#moleculeGrad)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

// Animated blob backgrounds
function AnimatedBlobs() {
  return (
    <>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.15), rgba(6, 182, 212, 0.1))',
          top: '-10%',
          right: '-5%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12), rgba(34, 211, 238, 0.08))',
          bottom: '-5%',
          left: '-5%',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[60px]"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(13, 148, 136, 0.08))',
          top: '40%',
          left: '30%',
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}

// Navigation component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-teal-500/5 border-b border-teal-500/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#"
          className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
          whileHover={{ scale: 1.02 }}
        >
          Arivazhagan P
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ y: -2 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.span
            className="w-6 h-0.5 bg-slate-600 block"
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-slate-600 block"
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-slate-600 block"
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-teal-500/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-slate-600 hover:text-teal-600 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={ref}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f7fa 50%, #f0fdfa 100%)',
      }}
    >
      <AnimatedBlobs />
      <FloatingParticles />
      <MoleculeShapes />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-32"
        style={{ y, opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-teal-500/20"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
              
              {/* Main photo container */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 p-1 shadow-2xl shadow-teal-500/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
                  <span className="text-7xl md:text-8xl">🧪</span>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-teal-600 font-bold">8+</span>
                <span className="text-slate-500 text-sm">Years</span>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-1/4 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl">⚕️</span>
                <span className="text-slate-600 text-sm font-medium">B.Pharm</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-teal-600 text-sm font-medium tracking-wider">📋 B.Pharm · Quality & Product Support</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Arivazhagan{' '}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">P</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-teal-600 font-medium mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Manager, Quality & Product Support · Pharmaceutical Professional
            </motion.p>

            <motion.p
              className="text-slate-600 text-lg leading-relaxed max-w-xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A seasoned pharmacist and quality professional with 8+ years of experience spanning hospital pharmacy, pharmaceutical manufacturing, and quality management. Dedicated to patient safety, regulatory compliance, and product excellence.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-6 text-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-1"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Experience
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white px-8 py-6 text-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-teal-500/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-teal-500"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Section wrapper with scroll animation
function AnimatedSection({ 
  children, 
  className = "", 
  id 
}: { 
  children: React.ReactNode
  className?: string
  id?: string 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

// About Section
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { num: '8+', label: 'Years of Experience' },
    { num: '3', label: 'Major Organizations' },
    { num: 'B.Pharm', label: 'Qualified Pharmacist' },
    { num: 'QMS', label: 'Quality Management' },
  ]

  const skills = [
    '📞 Communication', '👥 Team Leadership', '🔍 Problem Solving', '⚖️ Decision Making',
    '🏥 Patient Counseling', '📦 Purchasing Management', '📋 Quality Management',
    '📁 Documentation Control', '🔎 Auditing Processes', '💊 Drug Interactions',
    '📊 Supplier Audits', '🤝 Professional Ethics',
  ]

  return (
    <AnimatedSection 
      id="about" 
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <motion.span
              className="text-teal-600 text-sm font-semibold tracking-widest uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1 }}
            >
              Who I Am
            </motion.span>
            
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
            >
              About Me
            </motion.h2>

            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            {[
              "I am a dedicated pharmaceutical professional with a Bachelor of Pharmacy degree and over 8 years of hands-on experience across hospital pharmacy, pharmaceutical production, and quality management roles.",
              "My journey spans working at leading institutions — from Mylan Laboratories to Cethar Hospitals and now Medi Miracle Pharmaceuticals — where I've developed a strong foundation in patient care, drug safety, and quality systems.",
              "I am passionate about ensuring medication safety, streamlining quality processes, and mentoring pharmacy teams to deliver the best outcomes for patients and stakeholders alike."
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-slate-600 text-lg leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.7 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl p-6 border border-teal-100 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 cursor-default group"
                  whileHover={{ y: -4, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.num}
                  </div>
                  <div className="text-slate-500 text-sm mt-1 group-hover:text-teal-600 transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Core Skills & Competencies
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Personal Details */}
            <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl p-8 border border-teal-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Personal Details
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: '📍', label: 'Location', value: 'Cuddalore, Tamilnadu 606303' },
                  { icon: '🎂', label: 'Date of Birth', value: 'August 19, 1994' },
                  { icon: '🌐', label: 'Languages', value: 'English & Tamil' },
                  { icon: '🪪', label: 'License', value: 'TN77 20160003027 (LMV)' },
                  { icon: '🛂', label: 'Passport No', value: 'P9181657' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider">{item.label}</div>
                      <div className="text-slate-700 font-medium">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Education Section with Timeline
function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const education = [
    { 
      icon: '🎓', 
      degree: 'Bachelor of Pharmacy (B.Pharm)', 
      institution: 'Vinayaka Missions University, Salem, Tamilnadu',
      year: 'Aug 2016',
      gpa: '65%',
      color: 'from-teal-500 to-cyan-500'
    },
    { 
      icon: '📚', 
      degree: 'Intermediate (10+2)', 
      institution: 'Vani Vikash Higher Secondary School, Attur, Tamilnadu',
      year: 'Mar 2012',
      gpa: '73.5%',
      color: 'from-cyan-500 to-teal-400'
    },
    { 
      icon: '🏫', 
      degree: 'SSLC (10th Standard)', 
      institution: 'Thanthai Hans Rover Higher Secondary School, Perambalur, Tamilnadu',
      year: 'Mar 2010',
      gpa: '80%',
      color: 'from-teal-400 to-emerald-500'
    },
    { 
      icon: '📜', 
      degree: 'DCA (Diploma in Computer Applications)', 
      institution: 'Computer Applications',
      year: 'May 2016',
      gpa: '72%',
      color: 'from-emerald-500 to-teal-500'
    },
  ]

  return (
    <AnimatedSection 
      id="education" 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)',
      }}
    >
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            className="text-teal-600 text-sm font-semibold tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            Academic Background
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            Education
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                className="relative flex gap-6 md:gap-8"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-xl md:text-2xl">{edu.icon}</span>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-teal-100 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 group"
                  whileHover={{ y: -4, x: 4 }}
                  style={{ perspective: 1000 }}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${edu.color} rounded-t-2xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {edu.degree}
                  </h3>
                  <p className="text-teal-600 font-medium mt-1">{edu.institution}</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                      📅 {edu.year}
                    </span>
                    {edu.gpa && (
                      <span className="inline-flex items-center gap-1 text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                        ⭐ GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Experience Section
function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      role: 'Manager, Quality & Product Support',
      company: '🏭 Medi Miracle Pharmaceuticals, Trichy, Tamilnadu',
      period: 'May 2025 – Present',
      color: 'from-teal-500 to-cyan-500',
      tasks: [
        'Provided exceptional support to sales representatives in addressing client inquiries related to product specifications, performance, and potential issues.',
        'Led cross-functional teams in developing new products, ensuring seamless integration of quality considerations throughout the entire process.',
        'Developed comprehensive training materials across multiple departments, ensuring consistency in quality standards.',
        'Evaluated supplier capabilities through regular audits, ensuring continued compliance with established guidelines.',
      ]
    },
    {
      role: 'Pharmacy Incharge',
      company: '🏥 Cethar Hospitals, Trichy',
      period: 'Dec 2018 – Apr 2025',
      color: 'from-cyan-500 to-teal-400',
      tasks: [
        'Supervised and provided guidance to pharmacy technicians in the preparation and distribution of medication orders.',
        'Resolved customer inquiries concerning prescriptions, insurance coverage, pricing, and other related issues.',
        'Advised patients on potential drug interactions, side effects, proper dose timing, and medication storage.',
        'Supervised pharmacy staff in daily operations to ensure compliance with regulatory standards.',
      ]
    },
    {
      role: 'Pharmacist',
      company: '🏥 UDAYA HOSPITAL, Valapadi, Salem',
      period: 'Jan 2017 – Jan 2018',
      color: 'from-teal-400 to-emerald-500',
      tasks: [
        'Assisted customers with prescription refills, requests for over-the-counter medications, and other health care products.',
      ]
    },
    {
      role: 'Production Executive',
      company: '🏭 MYLAN LABORATORIES, Bangalore',
      period: 'Sep 2016 – Dec 2016',
      color: 'from-emerald-500 to-teal-500',
      tasks: [
        'Served as Assistant Production Coordinator in pharmaceutical manufacturing operations.',
      ]
    },
  ]

  return (
    <AnimatedSection 
      id="experience" 
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            className="text-teal-600 text-sm font-semibold tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            Professional Journey
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            Experience
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                {/* Left accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${exp.color} rounded-l-lg`} />
                
                <CardContent className="p-6 md:p-8 pl-8 md:pl-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {exp.role}
                      </h3>
                      <p className="text-teal-600 font-medium mt-1">{exp.company}</p>
                    </div>
                    <motion.span
                      className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                    >
                      {exp.period}
                    </motion.span>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.tasks.map((task, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start gap-3 text-slate-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.3 + i * 0.15 + j * 0.05 }}
                      >
                        <span className="text-teal-500 mt-1">▹</span>
                        <span className="leading-relaxed">{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contacts = [
    { 
      icon: '📸', 
      label: 'Instagram', 
      value: '@arivazhagan', 
      href: 'https://www.instagram.com/arivazhagan_p_/',
      hoverClass: 'hover:border-pink-500 hover:shadow-pink-500/20'
    },
    { 
      icon: '💬', 
      label: 'WhatsApp', 
      value: '+91-9597554706', 
      href: 'https://wa.me/919597554706',
      hoverClass: 'hover:border-green-500 hover:shadow-green-500/20'
    },
    { 
      icon: '✉️', 
      label: 'Email', 
      value: 'arivazhagan.pharma.2016@gmail.com', 
      href: 'mailto:arivazhagan.pharma.2016@gmail.com',
      hoverClass: 'hover:border-teal-500 hover:shadow-teal-500/20'
    },
  ]

  return (
    <AnimatedSection 
      id="contact" 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)',
      }}
    >
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <motion.span
          className="text-teal-600 text-sm font-semibold tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          Get In Touch
        </motion.span>
        
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
        >
          Contact Me
        </motion.h2>

        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-8"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : { width: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />

        <motion.p
          className="text-slate-600 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
        >
          Whether you're looking to collaborate, refer a professional, or just say hello — I'd love to hear from you. Reach out through any of the channels below.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-lg border border-slate-200 min-w-[180px] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${contact.hoverClass}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-4xl">{contact.icon}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{contact.label}</span>
              <span className="text-slate-700 font-medium text-sm">{contact.value}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7 }}
        >
          <Button 
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-6 text-lg shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-1"
            onClick={() => window.location.href = 'mailto:arivazhagan.pharma.2016@gmail.com?subject=Hello Arivazhagan&body=Hi Arivazhagan, I would like to get in touch with you.'}
          >
            Send a Message ✉️
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-600">
          <span className="font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Arivazhagan P</span>
          {' '}· Pharmacist & Quality Professional · © 2026
        </p>
        <p className="text-slate-400 text-sm mt-2">
          Cuddalore, Tamilnadu · Committed to Pharmaceutical Excellence
        </p>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🧪
              </motion.div>
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Arivazhagan P
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
