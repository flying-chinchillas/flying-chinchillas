import React, { useState } from 'react';
import './DownvoteButton.css';

const DownvoteButton = ({ downvotes }) => {
  const [downvoteCount, setDownvoteCount] = useState(downvotes);

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
