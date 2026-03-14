import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/logov2.png';
import './Footer.css';

const XIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src={logo} alt="Pixel Perfect" className="footer-logo-img" />
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#" aria-label="X (formerly Twitter)"><XIcon size={20} /></a>
                            <a href="#"><Instagram size={20} /></a>
                            <a href="https://www.linkedin.com/company/pixel-perfect-events-llc/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Pixel Perfect Events LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
