import React, { useState } from 'react';
import './Comment.css'; // Import the CSS file

function Comments() {
  const [comments, setComments] = useState([]);

  // Function to handle adding a comment
  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="comments-container"> {/* Apply container class */}
      <h3>Comments</h3>
      {/* Display existing comments */}
      {comments.map((comment, index) => (
        <div className="comment" key={index}>{comment}</div> 
      ))}
      {/* Add comment form */}
      <form className="comment" onSubmit={(e) => { e.preventDefault(); handleAddComment(e.target.comment.value); }}>
        <input type="text" name="comment" placeholder="Add a comment" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Comments;
