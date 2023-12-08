import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

function StarReview({ initialRating, onRate }) {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    if (onRate) {
      onRate(starIndex + 1);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={index <= rating ? 'star filled' : 'star'}
          onClick={() => handleStarClick(index)}
        >
          {index <= rating ? 
            <FontAwesomeIcon icon={faSolidStar} style={{color: "#8d4bc0",}} /> : 
            <FontAwesomeIcon icon={faRegularStar} style={{color: "#8d4bc0",}} /> 
          }
        </span>
      ))}
    </div>
  );
};

export default StarReview;