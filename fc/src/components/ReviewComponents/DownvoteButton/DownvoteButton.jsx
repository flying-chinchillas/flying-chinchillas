import React, { useState } from 'react';
import './DownvoteButton.css';

const DownvoteButton = () => {
  const [downvoteCount, setDownvoteCount] = useState(0);

  const handleDownvote = () => {
    setDownvoteCount(downvoteCount + 1);
  };

  return (
    <div className="downvote-container">
      <button className="downvote-button" onClick={handleDownvote}>
      <img className="status" src="../dislike.png" alt="thumbsup"></img>
      </button>
      <span className="downvote-count">{downvoteCount}</span>
    </div>
  );
};

export default DownvoteButton;;
