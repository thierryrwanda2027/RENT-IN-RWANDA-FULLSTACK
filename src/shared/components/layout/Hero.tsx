import React from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-watermark">08+</div>
      
      <div className="container hero-container">
        <span className="section-subtitle">Home Layouts</span>
        <h1 className="hero-title">
          08+ Eye Catching Customizable<br />Demos
        </h1>
        
        <p className="hero-description">
          <span className="highlight-text">ListOn</span> Template includes over <span className="highlight-text">34 pages in total</span>, with more than <span className="highlight-text">60 sections</span>, and <span className="highlight-text">8 different home pages</span>, 9 listing pages, and <span className="highlight-text">1 listing add page</span>.
        </p>

        <div className="floating-notification">
          <button className="close-btn">&times;</button>
          <p>Claim 50% OFF just for Today! —Enter your email to receive the crazy offer.</p>
        </div>
      </div>
    </section>
  );
};
