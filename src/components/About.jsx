import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import './About.css';

const FeatureCard = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`feature-card ${isExpanded ? 'active' : ''}`}>
            <div className="feature-card-header" onClick={() => setIsExpanded(!isExpanded)}>
                <h4>{title}</h4>
                <div className="feature-mobile-toggle">
                    {isExpanded ? <MinusCircle size={28} strokeWidth={1} /> : <PlusCircle size={28} strokeWidth={1} />}
                </div>
            </div>
            <div className="feature-card-body">
                <p>{content}</p>
            </div>
        </div>
    );
};

const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section id="about" className="about-section section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About <span className="text-gold">Pixel Perfect</span></h2>
                    <p className="section-subtitle">Delivering exceptional experiences with precision and creativity.</p>
                </div>

                <div className="about-content">
                    {/* Main About Text */}
                    <div className={`about-text ${isExpanded ? 'active' : ''}`}>
                        <div className="about-text-header" onClick={toggleExpand}>
                            <h3>Our Story</h3>
                            <div className="mobile-toggle">
                                {isExpanded ? <MinusCircle size={28} strokeWidth={1} /> : <PlusCircle size={28} strokeWidth={1} />}
                            </div>
                        </div>
                        <div className="about-text-body">
                            <p>
                                Pixel Perfect Events LLC is a professional event management and exhibition company dedicated to delivering exceptional experiences with precision, creativity, and flawless execution. Based in the United Arab Emirates, we specialize in producing high-impact corporate events, exhibitions, brand activations, and large-scale projects that bring brands and audiences together.
                            </p>
                            <p>
                                At Pixel Perfect Events, we believe that every successful event begins with a powerful idea and is perfected through meticulous planning and expert execution. Our team combines creative vision, technical expertise, and strategic event management to deliver experiences that are both visually impressive and seamlessly organized.
                            </p>
                            <p>
                                From exclusive corporate gatherings to large-scale public events, we transform concepts into immersive environments that reflect our clients’ brand identity and objectives.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="about-features">
                        <FeatureCard
                            title="Our Expertise"
                            content={
                                <ul className="feature-list">
                                    <li>Corporate conferences and executive events</li>
                                    <li>Exhibition stand design and build</li>
                                    <li>Brand activations and experiential marketing</li>
                                    <li>Government and community events</li>
                                    <li>Product launch events</li>
                                    <li>Opening ceremonies and gala dinners</li>
                                </ul>
                            }
                        />
                        <FeatureCard
                            title="Our Vision"
                            content="To be recognized as a leading event management and exhibition company in the UAE, delivering innovative event experiences that set new standards of creativity, quality, and precision."
                        />
                        <FeatureCard
                            title="Our Mission"
                            content="Our mission is to create impactful events that inspire audiences, strengthen brands, and deliver memorable experiences through strategic planning, creative design, and flawless event production."
                        />
                        <FeatureCard
                            title="Why Pixel Perfect"
                            content={
                                <div className="feature-detailed">
                                    <p>The name Pixel Perfect reflects our commitment to precision and excellence. Just like every pixel contributes to a perfect image, every detail contributes to the success of an event.</p>
                                    <ul className="feature-list">
                                        <li>Creative and strategic event concepts</li>
                                        <li>High-quality production and design</li>
                                        <li>Professional project management</li>
                                        <li>Seamless event execution</li>
                                        <li>Memorable guest experiences</li>
                                        <li>Tailored Solutions</li>
                                    </ul>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
