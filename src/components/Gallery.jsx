import React from 'react';
import './Gallery.css';

const galleryImages = [
    "https://images.unsplash.com/photo-1519225468765-a6a2800cf610?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
];

const Gallery = () => {
    return (
        <section id="gallery" className="gallery-section section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Recent <span className="text-gold">Masterpieces</span></h2>
                    <p className="section-subtitle">Visual stories from our latest events</p>
                </div>

                <div className="gallery-grid">
                    {galleryImages.map((img, index) => (
                        <div key={index} className="gallery-item">
                            <img src={img} alt={`Event ${index + 1}`} loading="lazy" />
                            <div className="gallery-overlay">
                                <div className="overlay-content">
                                    <h3>Event Name</h3>
                                    <p>View Details</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
