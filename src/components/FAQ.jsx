import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import './FAQ.css';

const faqData = [
    {
        question: "What events do you manage?",
        answer: "Corporate events, luxury celebrations, product launches, exhibitions, conferences, and community events."
    },
    {
        question: "Do you handle everything from start to finish?",
        answer: "Yes. We provide complete, end-to-end event management. From concept development and venue sourcing to production, execution, and final breakdown, our team manages every detail with precision and discretion. You benefit from a single point of contact and a fully integrated approach — ensuring clarity, efficiency, and flawless delivery at every stage."
    },
    {
        question: "Can events be customized?",
        answer: "Absolutely. Every event is tailored to your vision and goals."
    },
    {
        question: "Do you work with both corporate and private clients?",
        answer: "Yes. We cater to companies and individuals alike."
    },
    {
        question: "How far in advance should we book?",
        answer: "The ideal booking timeline depends primarily on the type of event, scale, and duration."
    },
    {
        question: "Can Pixel Perfect handle last-minute events?",
        answer: "Yes. While we always recommend early planning, our team is equipped to manage tight timelines depending on scope and availability. Contact us to assess feasibility."
    },
    {
        question: "Do you operate across the UAE?",
        answer: "Yes. We deliver high-quality events throughout Dubai, Abu Dhabi, Sharjah, and other emirates."
    },
    {
        question: "How do you ensure events run smoothly?",
        answer: "Through meticulous planning, real-time coordination, and expert execution."
    },
    {
        question: "Do you provide creative concepts and design?",
        answer: "Yes. We create unique themes, décor, stage setups, and immersive experiences."
    },
    {
        question: "What makes Pixel Perfect different?",
        answer: "We combine creativity, precision, and a personalized approach to craft truly unforgettable events."
    },
    {
        question: "How can we get a quote?",
        answer: "Contact us via phone, email, or our website—we’ll provide a customized proposal."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Frequently Asked <span className="text-gold">Questions</span></h2>
                    <p className="section-subtitle">Everything you need to know about our services</p>
                </div>

                <div className="faq-container">
                    {faqData.map((item, index) => (
                        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="faq-question" onClick={() => toggleAccordion(index)}>
                                <h3>{item.question}</h3>
                                {activeIndex === index ? <MinusCircle className="faq-icon" strokeWidth={1} size={28} /> : <PlusCircle className="faq-icon" strokeWidth={1} size={28} />}
                            </div>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
