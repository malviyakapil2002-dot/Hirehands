import React from 'react';

/**
 * AnimatedText – splits text into individual letters and animates each with a stagger.
 * Props: text (string), className (optional), delay (optional start delay in ms)
 */
const AnimatedText = ({ text, className = '', delay = 0 }) => {
    return (
        <span className={className} aria-label={text}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        animation: `letterFade 0.5s ease-out both`,
                        animationDelay: `${delay + i * 40}ms`,
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default AnimatedText;
