import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const countries = ['Italy', 'China', 'India', 'Vietnam', 'Turkey'];
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('Italy');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(countries[0].length);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000; // Pause when word is complete

    const handleTyping = () => {
      const currentCountry = countries[currentCountryIndex];
      
      if (!isDeleting && charIndex === currentCountry.length) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next country
        setIsDeleting(false);
        setCurrentCountryIndex((prev) => (prev + 1) % countries.length);
        return;
      }
      
      // Update displayed text
      if (isDeleting) {
        setDisplayedText(currentCountry.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setDisplayedText(currentCountry.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, currentCountryIndex, isDeleting, countries, isClient]);

  return (
    <section className="hero">
      <div className="hero-factory-building">
        <img 
          src="/assets/1a99001b03519da3548e530d8d8ab7449ee71c91.png"
          alt="Glass Factory Building" 
          className="factory-placeholder-img"
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Discover factories in <span className="hero-highlight typing-text">{displayedText}<span className="typing-cursor">|</span></span>
          <br />
          for your fashion brand
        </h1>
        <p className="hero-subtitle">
          Connect with vetted factories worldwide and bring<br />
          your designs to life with confidence.
        </p>
        <button className="hero-cta">Connect →</button>
      </div>

      <div className="hero-partners">
        <p className="partners-text">Our factories produce for</p>
        <div className="partners-logos-container">
          <div className="partners-logos">
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Flevi%20logo.png&w=256&q=75" alt="Levi's" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fkapital%20logo.png&w=256&q=75" alt="Kapital" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fdior%20logo.png&w=256&q=75" alt="Dior" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fgucci%20logo.png&w=256&q=75" alt="Gucci" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Flv%20logo.png&w=256&q=75" alt="Louis Vuitton" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fnike%20logo.png&w=256&q=75" alt="Nike" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fadidas%20logo.png&w=256&q=75" alt="Adidas" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2FBode%20logo.png&w=256&q=75" alt="Bode" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fchanel%20logo.png&w=256&q=75" alt="Chanel" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Flululemon%20logo.png&w=256&q=75" alt="Lululemon" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fprada%20logo.png&w=256&q=75" alt="Prada" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2FRRL%20logo.png&w=256&q=75" alt="RRL" className="partner-logo" />
            {/* Duplicate set for seamless scrolling */}
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Flevi%20logo.png&w=256&q=75" alt="Levi's" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fkapital%20logo.png&w=256&q=75" alt="Kapital" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fdior%20logo.png&w=256&q=75" alt="Dior" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fgucci%20logo.png&w=256&q=75" alt="Gucci" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Flv%20logo.png&w=256&q=75" alt="Louis Vuitton" className="partner-logo" />
            <img src="https://dev.glassfactory.info/_next/image?url=%2Fimages%2Flogos%2Fbrand_logos%2Fnike%20logo.png&w=256&q=75" alt="Nike" className="partner-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;