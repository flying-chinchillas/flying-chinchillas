import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
// import './StarReview.css';

function StarReview({ rating }) {
//  const [rating, setRating] = useState(0);

//  const handleStarClick = (starIndex) => {
//    setRating(starIndex + 1);
//    if (onRate) {
//      onRate(starIndex + 1);
//    }
//  };
 return (
   <div className="star-rating">
     {[1, 2, 3, 4, 5].map((index) => (
       <span
         key={index}
         className={index <= rating ? 'star filled' : 'star'}
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
