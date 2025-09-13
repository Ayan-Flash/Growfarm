import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { FaSeedling, FaBug, FaCloudSun, FaUsers, FaChartLine, FaRobot, FaArrowRight, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "./Farmer_homepage.css"

function Farmer_homepage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState({
    totalFarmers: 0,
    cropsRecommended: 0,
    diseasesDetected: 0,
    weatherAlerts: 0
  })

  const slides = [
    {
      image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      title: "Smart Agriculture Revolution",
      subtitle: "Empowering farmers with AI-driven insights and modern farming techniques",
      cta: "Start Your Journey"
    },
    {
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080", 
      title: "Precision Farming Solutions",
      subtitle: "Optimize your crop yield with data-driven recommendations",
      cta: "Explore Features"
    },
    {
      image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      title: "Sustainable Future",
      subtitle: "Building a sustainable agricultural ecosystem for tomorrow",
      cta: "Join Community"
    }
  ]

  const features = [
    {
      icon: <FaSeedling />,
      title: "Crop Recommendation & Yield Prediction",
      description: "Get AI-powered crop recommendations based on soil conditions, weather patterns, and historical data to maximize your yield potential.",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#4CAF50",
      link: "/Croprek"
    },
    {
      icon: <FaBug />,
      title: "Disease Detection",
      description: "Upload photos of your crops to instantly identify diseases and receive treatment recommendations from our advanced ML models.",
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#FF5722",
      link: "/Diseasepre"
    },
    {
      icon: <FaCloudSun />,
      title: "Weather Analytics",
      description: "Stay ahead with real-time weather forecasts, alerts, and climate insights tailored for your farming operations.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#2196F3",
      link: "/Weatherdetails"
    },
    {
      icon: <FaUsers />,
      title: "Expert Consultation",
      description: "Connect with agricultural experts for personalized advice and solutions to your farming challenges.",
      image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#9C27B0",
      link: "/ExpertTalk"
    },
    {
      icon: <FaChartLine />,
      title: "Scheme Management",
      description: "Discover and apply for government schemes and subsidies designed to support modern farming practices.",
      image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#FF9800",
      link: "/SchemesMain"
    },
    {
      icon: <FaRobot />,
      title: "AI Assistant",
      description: "Get instant answers to your farming questions with our intelligent chatbot available 24/7.",
      image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "#607D8B",
      link: "/ExpertTalk"
    }
  ]

  const testimonials = [
    {
      name: "Ramesh Patel",
      location: "Kheda District",
      text: "SmartAgri helped me increase my crop yield by 40% with their AI recommendations!",
      rating: 5
    },
    {
      name: "Priya Shah", 
      location: "Rajkot District",
      text: "The disease detection feature saved my entire cotton crop. Amazing technology!",
      rating: 5
    },
    {
      name: "Vikram Singh",
      location: "Ahmedabad District", 
      text: "Weather alerts helped me protect my crops from unexpected rainfall. Highly recommended!",
      rating: 5
    }
  ]

  useEffect(() => {
    setIsVisible(true)
    
    // Animate stats counter
    const animateStats = () => {
      const targets = { totalFarmers: 15420, cropsRecommended: 8750, diseasesDetected: 3240, weatherAlerts: 12680 }
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setStats({
          totalFarmers: Math.floor(targets.totalFarmers * progress),
          cropsRecommended: Math.floor(targets.cropsRecommended * progress),
          diseasesDetected: Math.floor(targets.diseasesDetected * progress),
          weatherAlerts: Math.floor(targets.weatherAlerts * progress)
        })

        if (step >= steps) {
          clearInterval(timer)
          setStats(targets)
        }
      }, stepTime)
    }

    const timer = setTimeout(animateStats, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(slideTimer)
  }, [slides.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Hero Carousel */}
      <div className="hero-carousel">
        <AnimatePresence mode="wait" custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="carousel-slide active"
          >
            <div 
              className="carousel-background"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            <div className="carousel-overlay">
              <motion.div 
                className="carousel-content"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <Link to="/Myaccount">
                    <Button variant="success" size="lg" className="cta-button">
                      <FaPlay className="me-2" />
                      {slides[currentSlide].cta}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Enhanced Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Floating Navigation Arrows */}
        <motion.button 
          className="carousel-nav prev"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </motion.button>
        <motion.button 
          className="carousel-nav next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          ›
        </motion.button>
      </div>

      {/* Animated Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="stat-card" variants={itemVariants}>
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                {stats.totalFarmers.toLocaleString()}+
              </motion.h3>
              <p>Registered Farmers</p>
              <div className="stat-icon">
                <FaUsers />
              </div>
            </motion.div>
            
            <motion.div className="stat-card" variants={itemVariants}>
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                {stats.cropsRecommended.toLocaleString()}+
              </motion.h3>
              <p>Crops Recommended</p>
              <div className="stat-icon">
                <FaSeedling />
              </div>
            </motion.div>
            
            <motion.div className="stat-card" variants={itemVariants}>
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                {stats.diseasesDetected.toLocaleString()}+
              </motion.h3>
              <p>Diseases Detected</p>
              <div className="stat-icon">
                <FaBug />
              </div>
            </motion.div>
            
            <motion.div className="stat-card" variants={itemVariants}>
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                {stats.weatherAlerts.toLocaleString()}+
              </motion.h3>
              <p>Weather Alerts Sent</p>
              <div className="stat-icon">
                <FaCloudSun />
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.section>

      {/* Enhanced Features Section */}
      <motion.section 
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container>
          <motion.div className="section-header" variants={itemVariants}>
            <h2>Comprehensive Farming Solutions</h2>
            <p>Discover our suite of AI-powered tools designed to revolutionize your farming experience</p>
          </motion.div>
          
          <Row>
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="feature-card">
                    <div className="feature-image">
                      <img src={feature.image} alt={feature.title} />
                      <div className="feature-overlay">
                        <motion.div 
                          className="feature-icon" 
                          style={{ color: feature.color }}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.icon}
                        </motion.div>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                      <Link to={feature.link}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline-success" 
                            className="feature-btn"
                            style={{ borderColor: feature.color, color: feature.color }}
                          >
                            Explore <FaArrowRight className="ms-2" />
                          </Button>
                        </motion.div>
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* Enhanced Overview Section */}
      <motion.section 
        className="overview-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2>Digital Agriculture Platform</h2>
                <p>
                  Our comprehensive digital platform creates individual profiles for every farmer, 
                  integrating personal information, farm details, yield data, and financial records. 
                  This centralized system enables government agencies and policymakers to implement 
                  targeted programs and subsidies effectively.
                </p>
                <motion.ul className="feature-list">
                  {[
                    "Centralized farmer database",
                    "AI-powered recommendations", 
                    "Real-time weather alerts",
                    "Disease detection system",
                    "Government scheme integration",
                    "Digital contract farming"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      ✓ {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <Link to="/sign-up">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="success" size="lg" className="mt-3">
                      Join Platform
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="overview-visual"
              >
                <div className="floating-cards">
                  <motion.div 
                    className="floating-card card-1"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaSeedling />
                    <span>Smart Farming</span>
                  </motion.div>
                  <motion.div 
                    className="floating-card card-2"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, -3, 0]
                    }}
                    transition={{ 
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <FaChartLine />
                    <span>Analytics</span>
                  </motion.div>
                  <motion.div 
                    className="floating-card card-3"
                    animate={{ 
                      y: [0, -25, 0],
                      rotate: [0, 4, 0]
                    }}
                    transition={{ 
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  >
                    <FaCloudSun />
                    <span>Weather</span>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Enhanced Testimonials Section */}
      <motion.section 
        className="testimonials-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <motion.h2 
            className="text-center mb-5"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Farmers Say About Us
          </motion.h2>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index}>
                <motion.div 
                  className="testimonial-card"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                >
                  <div className="testimonial-content">
                    <div className="stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + i * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                    <p>"{testimonial.text}"</p>
                    <div className="testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* Enhanced Call to Action Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <motion.div 
            className="cta-content"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Transform Your Farming?</h2>
            <p>Join thousands of farmers who are already benefiting from our smart agriculture platform</p>
            <div className="cta-buttons">
              <Link to="/sign-up">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="success" size="lg" className="me-3">
                    <FaSeedling className="me-2" />
                    Start Free Trial
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline-light" size="lg">
                  <FaPlay className="me-2" />
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </motion.section>

      {/* Scroll to Top Button */}
      <motion.button
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        viewport={{ once: true }}
      >
        ↑
      </motion.button>
    </motion.div>
  )
}

export default Farmer_homepage