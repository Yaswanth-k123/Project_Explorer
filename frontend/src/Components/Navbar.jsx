import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchTerm(val); // Update the search term state

    // Filter cards based on the search term
    const filteredCards = Object.fromEntries(
      Object.entries(props.cards).map(([id, items]) => {
       
        const filteredItems = items.filter(item => item.tech.toLowerCase().includes(val));
        return [id, filteredItems];
      })
    );

    // Update the parent component's state with filtered cards
    props.setFilteredCards(filteredCards);
  };

  return (
    <div>
      <nav className="nav">
        <div>
          <h2>MERN Application</h2>
        </div>
        <div className='search'>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
          <button>Search</button>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
