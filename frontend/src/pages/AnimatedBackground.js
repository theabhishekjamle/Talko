// src/components/AnimatedBackground.js
import React from 'react';


const AnimatedBackground = () => {
  return (
    <>
      <div className="animated-background"></div>
      {Array.from({ length: 100 }).map((_, i) => (
        <div 
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 20}px`,
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 5}s`
          }}
        />
      ))}
    </>
  );
};

export default AnimatedBackground;