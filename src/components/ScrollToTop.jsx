import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const amountScrolled = 200;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > amountScrolled) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`back-to-top ${showButton ? 'show' : ''}`}
      onClick={scrollToTop}
    >
    </button>
  );
};

export default BackToTopButton;
