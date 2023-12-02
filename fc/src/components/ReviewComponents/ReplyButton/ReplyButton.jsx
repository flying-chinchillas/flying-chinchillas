// ReplyButton.jsx
import React, { useState } from 'react';
import './ReplyButton.css';

const ReplyButton = ({ commentId, isReply }) => {
  const [replies, setReplies] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [replyText, setReplyText] = useState('');

  const toggleReplies = () => {
    if (!isRepliesVisible) {
      // Filter user's replies when the user expands the replies
      const userReplies = replies.filter((reply) => reply.isCurrentUser);
      setReplies(userReplies);
    }

    setIsRepliesVisible(!isRepliesVisible);
  };

  const handleReplyClick = () => {
    if (!isReply) {
      setIsReplying(true);
    }
  };

  const handleInputChange = (e) => {
    setReplyText(e.target.value);
  };

  const handlePostReply = () => {
    if (replyText.trim() === '') {
      // Don't post empty replies
      return;
    }

    // Simulate posting a reply to the server
    // (In a real application, you would make an API call)
    const newReply = {
      id: replies.length + 1,
      text: replyText,
      isCurrentUser: true, // Flag to indicate the reply was made by the current user
    };

    setReplies([...replies, newReply]);
    setIsRepliesVisible(true);
    setIsReplying(false);
    setReplyText('');
  };

  return (
    <div className="reply-button-container">
      {!isReply && (
        <button className="reply-button" onClick={handleReplyClick} disabled={isReplying}>
          Reply
        </button>
      )}

      {!isReply && (
        <button className="view-replies-button" onClick={toggleReplies}>
          {isRepliesVisible ? 'Collapse Replies' : 'View Replies'}
        
        </button>
      )}

      {isRepliesVisible && (
        <div className="replies-container">
          {replies.map((reply) => (
            <div key={reply.id} className="reply" style={{ marginLeft: '20px' }}>
              <p>{reply.text}</p>
              {/* Nested replies */}
              <ReplyButton commentId={reply.id} isReply={true} />
            </div>
          ))}
        </div>
      )}

      {isReplying && (
        <div className="reply-form">
          <textarea
            placeholder="Type your reply..."
            value={replyText}
            onChange={handleInputChange}
          />
          <button onClick={handlePostReply}>Post Reply</button>
        </div>
      )}
    </div>
  );
};

export default ReplyButton;
