import React, { useState } from 'react';
import {
    PlusCircle,
    MinusCircle
} from 'lucide-react';
import './Services.css';

import corporateImg from '../assets/services/corporate_events.png';
import exhibitionImg from '../assets/services/exhibition_stand.png';
import activationImg from '../assets/services/brand_activations.png';
import awardsImg from '../assets/services/government_events.png';
import launchImg from '../assets/services/product_launch.png';
import culturalImg from '../assets/services/opening_ceremonies.png';

const servicesData = [
    {
        title: "Corporate Events",
        image: corporateImg,
        description: (
            <div>
                <p>Corporate events are essential for strengthening business relationships, communicating brand values, and engaging stakeholders. At Pixel Perfect Events, we design and deliver high-impact corporate experiences that reflect professionalism, innovation, and attention to detail.</p>
                <p>From executive conferences to company milestone celebrations, we manage every aspect of the event—from concept development and production to on-site execution—ensuring a seamless and memorable experience.</p>
            </div>
        )
    },
    {
        title: "Exhibition Stand Design & Build",
        image: exhibitionImg,
        description: (
            <div>
                <p>Exhibitions are powerful platforms for brands to showcase their products and engage with potential clients. Pixel Perfect Events specializes in designing and building exhibition stands that combine creativity, functionality, and brand storytelling.</p>
                <p>We create visually striking stands that attract visitors, communicate your brand message, and enhance the overall exhibition experience.</p>
                <ul className="service-list">
                    <li>Custom exhibition stand design</li>
                    <li>Modular and custom-built stands</li>
                    <li>3D visualization and concept development</li>
                    <li>Stand fabrication and installation</li>
                    <li>Exhibition graphics and branding</li>
                    <li>Project management and logistics</li>
                </ul>
                <p className="service-goal">Our goal is to ensure your brand stands out on the exhibition floor and attracts maximum attention.</p>
            </div>
        )
    },
    {
        title: "Brand Activations",
        image: activationImg,
        description: (
            <div>
                <p>Brand activation events bring brands to life through engaging and immersive experiences. Our team creates dynamic activations that connect brands with audiences and create memorable interactions.</p>
                <p>From shopping mall activations to experiential marketing events, we develop creative concepts that enhance brand visibility and audience engagement.</p>
                <ul className="service-list">
                    <li>Experiential marketing events</li>
                    <li>Product sampling campaigns</li>
                    <li>Mall activations</li>
                    <li>Roadshows and promotional events</li>
                    <li>Interactive brand experiences</li>
                </ul>
                <p className="service-goal">We focus on delivering creative experiences that generate excitement and strengthen brand awareness.</p>
            </div>
        )
    },
    {
        title: "Award Ceremonies",
        image: awardsImg,
        description: (
            <div>
                <p>Award ceremonies are about honoring excellence and creating a sense of prestige. We design and produce unforgettable gala dinners and recognition events that celebrate achievements with sophistication and flair.</p>
                <p>From prestigious industry awards to internal corporate recognition, we create a glamorous atmosphere that reflects the significance of the occasion.</p>
                <ul className="service-list">
                    <li>Concept and theme development</li>
                    <li>Stage design and technical production</li>
                    <li>Trophy and recognition management</li>
                    <li>VIP hospitality and red carpet coordination</li>
                    <li>Entertainment and keynote speakers</li>
                </ul>
                <p className="service-goal">We craft prestigious environments that leave a lasting impact on your honorees and guests.</p>
            </div>
        )
    },
    {
        title: "Product Launch Events",
        image: launchImg,
        description: (
            <div>
                <p>A successful product launch creates excitement, media attention, and strong brand positioning. At Pixel Perfect Events, we design launch experiences that showcase your product in the most impactful way.</p>
                <p>From concept design to technical production, we ensure every element of the event builds anticipation and highlights your product's unique value.</p>
                <ul className="service-list">
                    <li>Creative launch concepts</li>
                    <li>Stage design and production</li>
                    <li>Product reveal moments</li>
                    <li>Media and influencer events</li>
                    <li>Launch presentations and demonstrations</li>
                </ul>
                <p className="service-goal">We transform product launches into unforgettable brand experiences.</p>
            </div>
        )
    },
    {
        title: "Cultural & Community Events",
        image: culturalImg,
        description: (
            <div>
                <p>Cultural and community events are the heart of a vibrant society. We specialize in planning and executing events that celebrate heritage, foster community Spirit, and create meaningful connections between people.</p>
                <p>From local festivals to large-scale cultural celebrations, we bring creativity and respect for tradition to every project, ensuring an inclusive and memorable experience for all.</p>
                <ul className="service-list">
                    <li>Cultural festivals and heritage celebrations</li>
                    <li>Community engagement workshops</li>
                    <li>Public art installations and exhibitions</li>
                    <li>Neighborhood gatherings and social events</li>
                <li>Strategic community outreach programs</li>
                </ul>
                <p className="service-goal">We believe in the power of events to unite communities and celebrate diverse cultures.</p>
            </div>
        )
    }
];

const ServiceCard = ({ service, isActive, onToggle }) => {
    return (
        <div className={`service-card ${isActive ? 'active' : ''}`}>
            <div className="service-image-container" onClick={onToggle}>
                <img src={service.image} alt={service.title} className="service-image" />
                <div className="service-image-overlay"></div>
                <div className="service-card-header-overlay">
                    <h3>{service.title}</h3>
                    <div className="service-mobile-toggle">
                        {isActive ? <MinusCircle size={24} strokeWidth={1} /> : <PlusCircle size={24} strokeWidth={1} />}
                    </div>
                </div>
            </div>
            <div className="service-card-body">
                <div className="service-description">{service.description}</div>
            </div>
        </div>
    );
};

const Services = () => {
    const [activeService, setActiveService] = useState(null);

    const toggleService = (index) => {
        setActiveService(activeService === index ? null : index);
    };

    return (
        <section id="services" className="services-section section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our <span className="text-gold">Services</span></h2>
                    <p className="section-subtitle">Comprehensive solutions for your event needs</p>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <ServiceCard 
                            key={index} 
                            service={service} 
                            isActive={activeService === index}
                            onToggle={() => toggleService(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
