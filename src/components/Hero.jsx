import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';
import landingVideo from '../assets/landing_vid.mp4';

const Hero = () => {
    return (
        <div id="hero" className="hero-section">
            <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={landingVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="hero-overlay"></div>

            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-tagline animate-fade-in">
                        Your Vision. <span className="text-white">Our Precision.</span>
                    </h1>
                    <h2 className="hero-title animate-fade-in">
                        Creating Exceptional Events with <span className="text-gold">Precision</span>
                    </h2>
                    <p className="hero-subtitle animate-slide-up">
                        Innovative event management and exhibition solutions delivering memorable experiences, impactful brand engagement, and flawless execution.
                    </p>
                    {/* <p className="hero-intro animate-slide-up">
                        Pixel Perfect Events LLC is a UAE-based event management and exhibition company specializing in corporate events, exhibitions, brand activations, and large-scale productions.
                    </p> */}
                    <div className="hero-buttons animate-slide-up">
                        <a href="#contact" className="btn btn-primary">
                            Plan Your Event <ArrowRight size={18} />
                        </a>
                        <a href="#services" className="btn btn-secondary">
                            Explore Our Services
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
