import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import './Contact.css';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [formData, setFormData] = useState({
        user_name: '',
        mobile_number: '',
        company_name: '',
        user_email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false);
                setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
                setFormData({
                    user_name: '',
                    mobile_number: '',
                    company_name: '',
                    user_email: '',
                    message: ''
                });
            } else {
                throw new Error(data.error || 'Failed to send message.');
            }
        } catch (error) {
            setLoading(false);
            setStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again later.' });
            console.error('Contact form error:', error);
        }
    };

    return (
        <section id="contact" className="contact-section section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get in <span className="text-gold">Touch</span></h2>
                    <p className="section-subtitle">Let's start planning your next big event</p>
                </div>

                <div className="contact-container glass-panel">
                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <p className="info-text">Fill out the form and our team will get back to you within 24 hours.</p>

                        <div className="info-items-list">
                            <div className="info-item">
                                <Phone className="info-icon" />
                                <span>+971 50 4408617</span>
                            </div>
                            <div className="info-item">
                                <Mail className="info-icon" />
                                <span>info@pixelperfectevents.ae</span>
                            </div>
                            <div className="info-item">
                                <MapPin className="info-icon" />
                                <span>Business Bay, G06-502, Dubai, UAE</span>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="user_name">Full Name</label>
                            <input
                                type="text"
                                id="user_name"
                                name="user_name"
                                placeholder="John Doe"
                                value={formData.user_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile_number">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobile_number"
                                name="mobile_number"
                                placeholder="+971 50 1234567"
                                value={formData.mobile_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company_name">Company Name</label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                placeholder="Your Company LLC"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_email">Email Address</label>
                            <input
                                type="email"
                                id="user_email"
                                name="user_email"
                                placeholder="john@example.com"
                                value={formData.user_email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Tell us about your event..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <>Sending... <Loader2 className="animate-spin" size={18} /></>
                            ) : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
