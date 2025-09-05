'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TechStackItem {
  name: string;
  logo: string;
}

interface AdvancedTechCarouselProps {
  items: TechStackItem[];
  speed?: number;
  pauseOnHover?: boolean;
}

export default function AdvancedTechCarousel({ 
  items, 
  speed = 40, 
  pauseOnHover = true 
}: AdvancedTechCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Split items into two rows untuk efek yang lebih menarik
  const midPoint = Math.ceil(items.length / 2);
  const row1Items = items.slice(0, midPoint);
  const row2Items = items.slice(midPoint);

  // Duplicate items untuk infinite scroll
  const duplicatedRow1 = [...row1Items, ...row1Items, ...row1Items];
  const duplicatedRow2 = [...row2Items, ...row2Items, ...row2Items];

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
    <div className="advanced-tech-carousel">
      {/* Multi-row carousel */}
      <div 
        className="carousel-multi-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* First row - bergerak ke kiri */}
        <div 
          className={`carousel-row carousel-row-1 ${isPaused ? 'paused' : ''}`}
          style={{
            '--animation-duration': `${speed}s`,
            '--total-width': `${row1Items.length * 220}px`
          } as React.CSSProperties}
        >
          <div className="carousel-track-advanced">
            {duplicatedRow1.map((tech, index) => (
              <div
                key={`row1-${tech.name}-${index}`}
                className="carousel-item-advanced"
              >
                <div className="tech-card-advanced">
                  <div className="tech-icon-advanced">
                    <Image 
                      src={tech.logo} 
                      alt={`${tech.name} logo`}
                      width={32}
                      height={32}
                      className="tech-logo-advanced"
                    />
                  </div>
                  <div className="tech-info-advanced">
                    <span className="tech-name-advanced">{tech.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - bergerak ke kanan */}
        <div 
          className={`carousel-row carousel-row-2 reverse ${isPaused ? 'paused' : ''}`}
          style={{
            '--animation-duration': `${speed * 1.2}s`,
            '--total-width': `${row2Items.length * 220}px`
          } as React.CSSProperties}
        >
          <div className="carousel-track-advanced">
            {duplicatedRow2.map((tech, index) => (
              <div
                key={`row2-${tech.name}-${index}`}
                className="carousel-item-advanced"
              >
                <div className="tech-card-advanced">
                  <div className="tech-icon-advanced">
                    <Image 
                      src={tech.logo} 
                      alt={`${tech.name} logo`}
                      width={32}
                      height={32}
                      className="tech-logo-advanced"
                    />
                  </div>
                  <div className="tech-info-advanced">
                    <span className="tech-name-advanced">{tech.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
