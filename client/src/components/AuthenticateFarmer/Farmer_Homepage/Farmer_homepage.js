import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { FaSeedling, FaBug, FaCloudSun, FaUsers, FaChartLine, FaRobot } from 'react-icons/fa'
import "./Farmer_homepage.css"

function Farmer_homepage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState({
    totalFarmers: 0,
    cropsRecommended: 0,
    diseasesDetected: 0,
    weatherAlerts: 0
  })

  const slides = [
    {
      image: "imgs/slider1.jpeg",
      title: "Smart Agriculture Revolution",
      subtitle: "Empowering farmers with AI-driven insights and modern farming techniques"
    },
    {
      image: "imgs/slider2.jpg", 
      title: "Precision Farming Solutions",
      subtitle: "Optimize your crop yield with data-driven recommendations"
    },
    {
      image: "imgs/Overview.jpg",
      title: "Sustainable Future",
      subtitle: "Building a sustainable agricultural ecosystem for tomorrow"
    }
  ]

  const features = [
    {
      icon: <FaSeedling />,
      title: "Crop Recommendation & Yield Prediction",
      description: "Get AI-powered crop recommendations based on soil conditions, weather patterns, and historical data to maximize your yield potential.",
      image: "imgs/Crop Recommendation.jpg",
      color: "#4CAF50"
    },
    {
      icon: <FaBug />,
      title: "Disease Detection",
      description: "Upload photos of your crops to instantly identify diseases and receive treatment recommendations from our advanced ML models.",
      image: "imgs/Disease Prediction.jpg",
      color: "#FF5722"
    },
    {
      icon: <FaCloudSun />,
      title: "Weather Analytics",
      description: "Stay ahead with real-time weather forecasts, alerts, and climate insights tailored for your farming operations.",
      image: "imgs/Weather1.jpg",
      color: "#2196F3"
    },
    {
      icon: <FaUsers />,
      title: "Expert Consultation",
      description: "Connect with agricultural experts for personalized advice and solutions to your farming challenges.",
      image: "imgs/Expert talk.png",
      color: "#9C27B0"
    },
    {
      icon: <FaChartLine />,
      title: "Scheme Management",
      description: "Discover and apply for government schemes and subsidies designed to support modern farming practices.",
      image: "imgs/Alert And Update System.jpg",
      color: "#FF9800"
    },
    {
      icon: <FaRobot />,
      title: "AI Assistant",
      description: "Get instant answers to your farming questions with our intelligent chatbot available 24/7.",
      image: "imgs/Chatbot Grow.jpg",
      color: "#607D8B"
    }
  ]

  useEffect(() => {
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
    }, 5000)

    return () => clearInterval(slideTimer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <>
      {/* Enhanced Hero Carousel */}
      <div className="hero-carousel">
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 1.1
              }}
              transition={{ duration: 1 }}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="carousel-overlay">
                <motion.div 
                  className="carousel-content"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <Button variant="success" size="lg" className="cta-button">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row>
            <Col md={3}>
              <div className="stat-card">
                <h3>{stats.totalFarmers.toLocaleString()}</h3>
                <p>Registered Farmers</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card">
                <h3>{stats.cropsRecommended.toLocaleString()}</h3>
                <p>Crops Recommended</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card">
                <h3>{stats.diseasesDetected.toLocaleString()}</h3>
                <p>Diseases Detected</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card">
                <h3>{stats.weatherAlerts.toLocaleString()}</h3>
                <p>Weather Alerts Sent</p>
              </div>
            </Col>
          </Row>
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
                <motion.div variants={itemVariants}>
                  <Card className="feature-card" style={{ '--accent-color': feature.color }}>
                    <div className="feature-image">
                      <img src={feature.image} alt={feature.title} />
                      <div className="feature-overlay">
                        <div className="feature-icon" style={{ color: feature.color }}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{feature.title}</Card.Title>
                      <Card.Text>{feature.description}</Card.Text>
                      <Button 
                        variant="outline-success" 
                        className="feature-btn"
                        style={{ borderColor: feature.color, color: feature.color }}
                      >
                        Learn More
                      </Button>
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
                <ul className="feature-list">
                  <li>✓ Centralized farmer database</li>
                  <li>✓ AI-powered recommendations</li>
                  <li>✓ Real-time weather alerts</li>
                  <li>✓ Disease detection system</li>
                  <li>✓ Government scheme integration</li>
                  <li>✓ Digital contract farming</li>
                </ul>
                <Button variant="success" size="lg" className="mt-3">
                  Join Platform
                </Button>
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
                  <div className="floating-card card-1">
                    <FaSeedling />
                    <span>Smart Farming</span>
                  </div>
                  <div className="floating-card card-2">
                    <FaChartLine />
                    <span>Analytics</span>
                  </div>
                  <div className="floating-card card-3">
                    <FaCloudSun />
                    <span>Weather</span>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* New Testimonials Section */}
      <motion.section 
        className="testimonials-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <h2 className="text-center mb-5">What Farmers Say</h2>
          <Row>
            <Col md={4}>
              <motion.div 
                className="testimonial-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="testimonial-content">
                  <p>"SmartAgri helped me increase my crop yield by 40% with their AI recommendations!"</p>
                  <div className="testimonial-author">
                    <strong>Ramesh Patel</strong>
                    <span>Kheda District</span>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="testimonial-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="testimonial-content">
                  <p>"The disease detection feature saved my entire cotton crop. Amazing technology!"</p>
                  <div className="testimonial-author">
                    <strong>Priya Shah</strong>
                    <span>Rajkot District</span>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="testimonial-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="testimonial-content">
                  <p>"Weather alerts helped me protect my crops from unexpected rainfall. Highly recommended!"</p>
                  <div className="testimonial-author">
                    <strong>Vikram Singh</strong>
                    <span>Ahmedabad District</span>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container>
          <div className="cta-content">
            <h2>Ready to Transform Your Farming?</h2>
            <p>Join thousands of farmers who are already benefiting from our smart agriculture platform</p>
            <div className="cta-buttons">
              <Button variant="success" size="lg" className="me-3">
                Start Free Trial
              </Button>
              <Button variant="outline-light" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </Container>
      </motion.section>
    </>
  )
}

export default Farmer_homepage