import React from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedText from '../components/AnimatedText';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <ParticleBackground />

            {/* Hero */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <AnimatedText text="Welcome to HireHands" delay={200} />
                    </h1>
                    <p className="hero-subtitle" style={{ animation: 'fadeUp 0.6s ease-out 1s both' }}>
                        Connecting skilled labour with trusted contractors.
                    </p>
                    <div className="hero-cta" style={{ animation: 'fadeUp 0.6s ease-out 1.4s both' }}>
                        <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
                        <Link to="/register" className="btn btn-secondary btn-lg">Register →</Link>
                    </div>
                    <div className="hero-stats" style={{ animation: 'fadeUp 0.6s ease-out 1.8s both' }}>
                        <div className="hero-stat"><strong>50K+</strong><span>Workers</span></div>
                        <div className="hero-stat"><strong>100K+</strong><span>Jobs</span></div>
                        <div className="hero-stat"><strong>4.8/5</strong><span>Rating</span></div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <h2 className="section-title">Why HireHands?</h2>
                <div className="features-grid">
                    <div className="feature-card card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Verified Profiles</h3>
                        <p>Every worker is background-checked and skill-verified.</p>
                    </div>
                    <div className="feature-card card">
                        <div className="feature-icon">⏱️</div>
                        <h3>Fast Hiring</h3>
                        <p>Post a job and get matched with skilled labour in minutes.</p>
                    </div>
                    <div className="feature-card card">
                        <div className="feature-icon">💳</div>
                        <h3>Transparent Pay</h3>
                        <p>Automated attendance tracking and clear wage calculations.</p>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="how-section">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-grid">
                    <div className="step-item"><div className="step-num">1</div><h3>Post a Job</h3><p>Create listings with skills, location, and wages.</p></div>
                    <div className="step-item"><div className="step-num">2</div><h3>Get Matched</h3><p>Labour is assigned based on skills and availability.</p></div>
                    <div className="step-item"><div className="step-num">3</div><h3>Work & Earn</h3><p>Complete jobs, mark attendance, get paid securely.</p></div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-inner">
                    <p><strong>🛠️ HireHands</strong> — Empowering the daily wage workforce.</p>
                    <p>&copy; {new Date().getFullYear()} HireHands. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
