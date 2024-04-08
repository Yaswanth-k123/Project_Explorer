import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Details.css";
import Leftbar from '../Leftbar/Leftbar.jsx';
import Comments from '../Comments/Comment.jsx';
import Likes from "../LIKES/Likes.jsx"

function Details(props) {
  const [ratings, setRatings] = useState([]); // State to store ratings

  // Function to handle rating change
  const handleRatingChange = (newRating) => {
    // Add new rating to the ratings array
    setRatings([...ratings, newRating]);
  };

  // Calculate average rating
  const averageRating = () => {
    if (ratings.length === 0) return 0; // No ratings yet
    const total = ratings.reduce((accumulator, currentValue) => accumulator + currentValue);
    return total / ratings.length;
  };

  return (
    <div>
      <Leftbar />
      <div className='container1'>
        <img src={props.selectedCard.image} />
        <h5>Title - {props.selectedCard.title}</h5>
        <p>Tech  -  {props.selectedCard.tech}</p>
        <p>Description - {props.selectedCard.content}</p>
        {/* Display the average rating */}
        <p>Average Rating: {averageRating().toFixed(1)}</p>
        {/* Display the rating */}
        <div className="rating">
          <p>Rating:</p>
          {/* Display stars for rating */}
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                onClick={() => handleRatingChange(ratingValue)}
                style={{ color: ratingValue <= averageRating() ? 'gold' : 'grey', cursor: 'pointer' }}
              >
                ★
              </span>
            );
          })}
        </div>     
        <Link to={props.selectedCard.link}>show project</Link>
        <Likes />
        <Comments />
        
      </div>
    </div>
  );
}

export default Details;
