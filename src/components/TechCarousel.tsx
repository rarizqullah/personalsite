'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TechStackItem {
  name: string;
  logo: string;
}

interface TechCarouselProps {
  items: TechStackItem[];
  speed?: number;
  pauseOnHover?: boolean;
}

export default function TechCarousel({ 
  items, 
  speed = 50, 
  pauseOnHover = true 
}: TechCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items untuk infinite scroll
  const duplicatedItems = [...items, ...items];

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div className="tech-carousel-wrapper">
      <div className="tech-carousel-container">
        <div 
          className={`tech-carousel-track ${isPaused ? 'paused' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            '--animation-duration': `${speed}s`,
            '--total-width': `${items.length * 200}px`
          } as React.CSSProperties}
        >
          {duplicatedItems.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="tech-carousel-item"
            >
              <div className="tech-item-card">
                <div className="tech-logo-container">
                  <Image 
                    src={tech.logo} 
                    alt={`${tech.name} logo`}
                    width={28}
                    height={28}
                    className="tech-logo"
                  />
                </div>
                <span className="tech-item-name">{tech.name}</span>
                
                {/* Decorative elements */}
                <div className="tech-item-shine"></div>
                <div className="tech-item-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient fade edges */}
      <div className="carousel-fade carousel-fade-left"></div>
      <div className="carousel-fade carousel-fade-right"></div>
      
      {/* Floating background elements */}
      <div className="carousel-bg-elements">
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>
        <div className="bg-element bg-element-3"></div>
      </div>
    </div>
  );
}
