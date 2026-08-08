import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ items = [], autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length, isHovered]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!items.length) {
    return <h3>No carousel items found.</h3>;
  }

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div className="carousel-slide" key={index}>
            <div className="carousel-slide-content">
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x600/1e3a5f/ffffff?text=" +
                    item.title;
                }}
              />
              <div className="carousel-overlay">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={goToPrev}>
            ❮
          </button>
          <button className="carousel-btn next" onClick={goToNext}>
            ❯
          </button>
        </>
      )}

      <div className="carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
