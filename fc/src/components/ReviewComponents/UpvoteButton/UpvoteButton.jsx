import React, { useState } from 'react';
import './UpvoteButton.css';

const UpvoteButton = () => {
  const [upvoteCount, setUpvoteCount] = useState(0);

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1);
  };

  return (
    <div className="upvote-container">
      <button className="upvote-button" onClick={handleUpvote}>
      <img className="status" src="../like.png" alt="thumbsup"></img>
      </button>
      <span className="upvote-count">{upvoteCount}</span>
    </div>
  );
};

export default UpvoteButton;
