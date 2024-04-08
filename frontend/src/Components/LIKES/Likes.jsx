import React, { useState } from 'react';
import "./Likes.css";
function LikesDislikes() {
  const [likes, setLikes] = useState(0); // State to store likes
  const [dislikes, setDislikes] = useState(0); // State to store dislikes

  // Function to handle like
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // Function to handle dislike
  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className="likes-dislikes">
      <p>Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
      <p>Dislikes: {dislikes}</p>
      <button onClick={handleDislike}>Dislike</button>
    </div>
  );
}

export default LikesDislikes;
