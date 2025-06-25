
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EmployeeReview = () => {
  const [hoveredReview, setHoveredReview] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
      offset: 100
    });

    // Trigger staggered animations
    const timer = setTimeout(() => setAnimationTrigger(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const employees = [
    {
      name: "Sarah Johnson",
      position: "Marketing Manager",
      rating: 5,
      review: "Working at ChillFizz has been an incredible journey! The company culture is amazing, and I love being part of a team that's passionate about creating refreshing experiences.",
      fullReview: "Working at ChillFizz has been an incredible journey! The company culture is amazing, and I love being part of a team that's passionate about creating refreshing experiences. The work-life balance is exceptional, and the leadership team truly cares about employee growth and wellbeing. Every day brings new challenges and opportunities to innovate.",
      avatar: "👩‍💼",
      department: "Marketing",
      yearsWorked: 3,
      highlight: "Great work-life balance",
      color: "#FF6B6B",
      achievements: ["Employee of the Month (3x)", "Led successful product launch", "Mentored 5 junior staff"]
    },
    {
      name: "Michael Chen",
      position: "Product Developer",
      rating: 5,
      review: "The innovation opportunities here are endless. I get to experiment with new flavors and contribute to products that millions of people enjoy worldwide.",
      fullReview: "The innovation opportunities here are endless. I get to experiment with new flavors and contribute to products that millions of people enjoy worldwide. The R&D facilities are state-of-the-art, and we have access to cutting-edge technology. The collaborative environment encourages creative thinking and bold experimentation.",
      avatar: "👨‍🔬",
      department: "R&D",
      yearsWorked: 2,
      highlight: "Innovation-focused environment",
      color: "#4ECDC4",
      achievements: ["Developed 3 bestselling flavors", "Patent holder", "Innovation award winner"]
    },
    {
      name: "Emily Rodriguez",
      position: "Sales Director",
      rating: 4,
      review: "ChillFizz invests in its people. The training programs are top-notch, and there's always room for growth. Plus, the team events are always a blast!",
      fullReview: "ChillFizz invests in its people. The training programs are top-notch, and there's always room for growth. Plus, the team events are always a blast! The sales targets are challenging but achievable, and the commission structure is very competitive. Management is supportive and provides excellent mentorship.",
      avatar: "👩‍💻",
      department: "Sales",
      yearsWorked: 4,
      highlight: "Excellent career growth",
      color: "#45B7D1",
      achievements: ["Top performer 2023", "Expanded market reach by 40%", "Team leadership excellence"]
    },
    {
      name: "David Thompson",
      position: "Quality Assurance Lead",
      rating: 5,
      review: "I'm proud to ensure every bottle meets our high standards. The company really cares about quality and customer satisfaction, which makes my job meaningful.",
      fullReview: "I'm proud to ensure every bottle meets our high standards. The company really cares about quality and customer satisfaction, which makes my job meaningful. We have rigorous testing protocols and the latest equipment. The emphasis on quality over quantity aligns perfectly with my professional values.",
      avatar: "👨‍🔧",
      department: "Quality",
      yearsWorked: 5,
      highlight: "Purpose-driven work",
      color: "#96CEB4",
      achievements: ["Zero defects record", "Process improvement leader", "Quality certification expert"]
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index}
        style={{
          color: index < rating ? '#FFD700' : '#E0E0E0',
          fontSize: '1.2rem',
          textShadow: index < rating ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none',
          transition: 'all 0.3s ease',
          display: 'inline-block',
          transform: hoveredReview !== null ? `rotate(${Math.random() * 10 - 5}deg)` : 'rotate(0deg)'
        }}
      >
        ★
      </span>
    ));
  };

  const openModal = (employee) => {
    setSelectedReview(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedReview(null), 300);
  };

  const averageRating = (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Animated Background Elements */}
        <div style={styles.backgroundElements}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.floatingElement,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div style={styles.header} data-aos="fade-down">
          <h1 style={{
            ...styles.title,
            transform: animationTrigger ? 'translateY(0)' : 'translateY(-50px)',
            opacity: animationTrigger ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}>
            Employee Reviews
          </h1>
          <div style={styles.titleUnderline}></div>
          <p style={styles.subtitle}>
            Hear from our amazing team members who make ChillFizz possible
          </p>
          <div style={styles.overallRating} data-aos="zoom-in" data-aos-delay="200">
            <div style={{
              ...styles.ratingValue,
              animation: 'pulse 2s infinite'
            }}>
              {averageRating}
            </div>
            <div style={styles.ratingStars}>
              {renderStars(Math.round(averageRating))}
            </div>
            <div style={styles.ratingText}>Average Employee Rating</div>
          </div>
        </div>

        <div style={styles.reviewsGrid}>
          {employees.map((employee, index) => (
            <div
              key={index}
              style={{
                ...styles.reviewCard,
                transform: hoveredReview === index 
                  ? 'translateY(-15px) scale(1.05) rotateX(5deg)' 
                  : 'translateY(0) scale(1) rotateX(0deg)',
                boxShadow: hoveredReview === index 
                  ? `0 25px 50px rgba(0,0,0,0.2), 0 0 30px ${employee.color}40` 
                  : '0 10px 30px rgba(0,0,0,0.1)',
                borderColor: hoveredReview === index ? employee.color : 'rgba(0, 123, 255, 0.1)',
                background: hoveredReview === index 
                  ? `linear-gradient(135deg, rgba(255,255,255,0.98), ${employee.color}10)`
                  : 'rgba(255, 255, 255, 0.95)'
              }}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              onMouseEnter={() => setHoveredReview(index)}
              onMouseLeave={() => setHoveredReview(null)}
              onClick={() => openModal(employee)}
            >
              {/* Floating particles on hover */}
              {hoveredReview === index && (
                <div style={styles.particleContainer}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.particle,
                        backgroundColor: employee.color,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}

              <div style={styles.reviewHeader}>
                <div style={styles.employeeInfo}>
                  <div style={{
                    ...styles.avatar,
                    background: `linear-gradient(135deg, ${employee.color}, ${employee.color}dd)`,
                    transform: hoveredReview === index ? 'scale(1.1) rotateY(360deg)' : 'scale(1)',
                    transition: 'all 0.6s ease'
                  }}>
                    {employee.avatar}
                  </div>
                  <div style={styles.employeeDetails}>
                    <h3 style={{
                      ...styles.employeeName,
                      color: hoveredReview === index ? employee.color : '#2c3e50'
                    }}>
                      {employee.name}
                    </h3>
                    <p style={styles.employeePosition}>{employee.position}</p>
                    <p style={styles.employeeDepartment}>
                      {employee.department} • {employee.yearsWorked} years
                    </p>
                  </div>
                </div>
                <div style={styles.ratingContainer}>
                  <div style={styles.stars}>
                    {renderStars(employee.rating)}
                  </div>
                  <div style={styles.ratingNumber}>{employee.rating}/5</div>
                </div>
              </div>

              <div style={styles.reviewContent}>
                <p style={styles.reviewText}>"{employee.review}"</p>
                <div style={{
                  ...styles.highlight,
                  borderColor: employee.color,
                  background: `${employee.color}15`
                }}>
                  <span style={styles.highlightIcon}>✨</span>
                  <span style={{
                    ...styles.highlightText,
                    color: employee.color
                  }}>
                    {employee.highlight}
                  </span>
                </div>
              </div>

              <div style={styles.reviewFooter}>
                <div style={styles.verifiedBadge}>
                  <span style={styles.verifiedIcon}>✓</span>
                  Verified Employee
                </div>
                <button style={{
                  ...styles.readMoreBtn,
                  backgroundColor: employee.color,
                  opacity: hoveredReview === index ? 1 : 0,
                  transform: hoveredReview === index ? 'translateY(0)' : 'translateY(10px)'
                }}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.joinTeam} data-aos="fade-up" data-aos-delay="800">
          <h3 style={styles.joinTitle}>Want to Join Our Amazing Team?</h3>
          <p style={styles.joinSubtitle}>We're always looking for passionate individuals to join the ChillFizz family</p>
          <button 
            style={styles.joinButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 123, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 123, 255, 0.3)';
            }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            <span style={styles.buttonText}>View Open Positions</span>
            <span style={styles.buttonIcon}>🚀</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          ...styles.modal,
          opacity: isModalOpen ? 1 : 0,
          pointerEvents: isModalOpen ? 'all' : 'none'
        }}>
          <div style={{
            ...styles.modalContent,
            transform: isModalOpen ? 'translateY(0) scale(1)' : 'translateY(-50px) scale(0.9)',
            borderColor: selectedReview?.color
          }}>
            <button style={styles.closeBtn} onClick={closeModal}>×</button>
            {selectedReview && (
              <>
                <div style={{
                  ...styles.modalHeader,
                  background: `linear-gradient(135deg, ${selectedReview.color}20, ${selectedReview.color}05)`
                }}>
                  <div style={{
                    ...styles.avatar,
                    background: `linear-gradient(135deg, ${selectedReview.color}, ${selectedReview.color}dd)`,
                    width: '80px',
                    height: '80px',
                    fontSize: '2rem'
                  }}>
                    {selectedReview.avatar}
                  </div>
                  <div>
                    <h2 style={{ color: selectedReview.color, margin: '0 0 0.5rem 0' }}>
                      {selectedReview.name}
                    </h2>
                    <p style={{ margin: '0', color: '#666' }}>{selectedReview.position}</p>
                    <p style={{ margin: '0', fontSize: '0.9rem', color: '#888' }}>
                      {selectedReview.department} • {selectedReview.yearsWorked} years
                    </p>
                  </div>
                </div>
                <div style={styles.modalBody}>
                  <div style={styles.stars}>
                    {renderStars(selectedReview.rating)}
                  </div>
                  <p style={styles.fullReview}>"{selectedReview.fullReview}"</p>
                  <div style={styles.achievements}>
                    <h4 style={{ color: selectedReview.color }}>Key Achievements:</h4>
                    <ul>
                      {selectedReview.achievements.map((achievement, i) => (
                        <li key={i} style={styles.achievementItem}>
                          <span style={{ color: selectedReview.color }}>🏆</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    padding: '6rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    color: '#333',
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0
  },
  floatingElement: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    animation: 'float 10s infinite ease-in-out',
    top: '100%'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  title: {
    fontSize: '3.5rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'white',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)'
  },
  titleUnderline: {
    width: '120px',
    height: '4px',
    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
    margin: '0 auto 2rem auto',
    borderRadius: '2px',
    animation: 'pulse 2s infinite'
  },
  subtitle: {
    fontSize: '1.2rem',
    fontFamily: 'Open Sans, sans-serif',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '600px',
    margin: '0 auto 3rem auto',
    lineHeight: '1.6'
  },
  overallRating: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '2rem',
    borderRadius: '25px',
    display: 'inline-block',
    boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    backdropFilter: 'blur(10px)'
  },
  ratingValue: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: '0.5rem',
    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
  },
  ratingStars: {
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  ratingText: {
    fontSize: '0.9rem',
    color: '#666',
    textAlign: 'center',
    fontWeight: '600'
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '2.5rem',
    marginBottom: '4rem'
  },
  reviewCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '25px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '2px solid rgba(0, 123, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    perspective: '1000px'
  },
  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1
  },
  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    animation: 'particleFloat 2s infinite ease-in-out',
    opacity: 0.7
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 2
  },
  employeeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #007BFF, #0056b3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    color: 'white',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'all 0.6s ease'
  },
  employeeDetails: {
    flex: 1
  },
  employeeName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 0.25rem 0',
    transition: 'color 0.3s ease'
  },
  employeePosition: {
    fontSize: '1rem',
    color: '#007BFF',
    fontWeight: '600',
    margin: '0 0 0.25rem 0'
  },
  employeeDepartment: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0
  },
  ratingContainer: {
    textAlign: 'right'
  },
  stars: {
    marginBottom: '0.25rem'
  },
  ratingNumber: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: '600'
  },
  reviewContent: {
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 2
  },
  reviewText: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#444',
    fontStyle: 'italic',
    marginBottom: '1rem'
  },
  highlight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(0, 123, 255, 0.1)',
    padding: '0.75rem 1rem',
    borderRadius: '15px',
    border: '2px solid rgba(0, 123, 255, 0.2)',
    transition: 'all 0.3s ease'
  },
  highlightIcon: {
    fontSize: '1rem'
  },
  highlightText: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#007BFF'
  },
  reviewFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2
  },
  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(40, 167, 69, 0.1)',
    color: '#28a745',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    border: '1px solid rgba(40, 167, 69, 0.2)'
  },
  verifiedIcon: {
    background: '#28a745',
    color: 'white',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem'
  },
  readMoreBtn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  joinTeam: {
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '4rem',
    borderRadius: '30px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
  },
  joinTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  joinSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2.5rem',
    lineHeight: '1.6'
  },
  joinButton: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '1.2rem 3rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 10px 20px rgba(0, 123, 255, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    overflow: 'hidden'
  },
  buttonText: {
    position: 'relative',
    zIndex: 1
  },
  buttonIcon: {
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    transition: 'opacity 0.3s ease',
    backdropFilter: 'blur(5px)'
  },
  modalContent: {
    background: 'white',
    borderRadius: '25px',
    padding: '2rem',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative',
    transition: 'all 0.3s ease',
    border: '3px solid #007BFF',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#666',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    padding: '1rem',
    borderRadius: '15px'
  },
  modalBody: {
    textAlign: 'center'
  },
  fullReview: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#444',
    fontStyle: 'italic',
    marginBottom: '2rem'
  },
  achievements: {
    textAlign: 'left'
  },
  achievementItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '1rem'
  }
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-30px) rotate(120deg); }
    66% { transform: translateY(-60px) rotate(240deg); }
  }
  
  @keyframes particleFloat {
    0% { transform: translateY(0px) scale(0); opacity: 0; }
    50% { transform: translateY(-20px) scale(1); opacity: 1; }
    100% { transform: translateY(-40px) scale(0); opacity: 0; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
`;
document.head.appendChild(styleSheet);

export default EmployeeReview;
