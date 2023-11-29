// StarReview.jsx
import React, { useState } from 'react';
import './StarReview.css';

const StarReview = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
    if (onRate) {
      onRate(starIndex + 1);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={index <= rating - 1 ? 'star filled' : 'star'}
          onClick={() => handleStarClick(index)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarReview;
