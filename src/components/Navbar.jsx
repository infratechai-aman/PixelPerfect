import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logov2.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="navbar-logo">
                    <img src={logo} alt="Pixel Perfect" className="logo-img" />
                </a>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </div>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#hero" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
                    <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
                    <li><a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a></li>
                    <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
