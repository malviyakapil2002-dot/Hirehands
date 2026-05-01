import React from 'react';
import './BubbleBackground.css';

const BubbleBackground = () => {
    // Generate an array of 15 bubbles with varying properties for animation
    const bubbles = Array.from({ length: 15 });

    return (
        <div className="bubble-bg-container">
            {bubbles.map((_, i) => (
                <div
                    key={i}
                    className="bubble"
                    style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 80 + 30}px`,
                        height: `${Math.random() * 80 + 30}px`,
                        animationDuration: `${Math.random() * 10 + 10}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
    );
};

export default BubbleBackground;
