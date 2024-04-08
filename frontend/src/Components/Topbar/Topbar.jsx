import "./Topbar.css";
import { useEffect, useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import {Link} from "react-router-dom";
export default function Topbar(props) {
  
const [searchTerm,setSearchTerm]=useState('');
useEffect(() => {
  props.setSearchTerm(searchTerm);
},[searchTerm])
  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchTerm(val); // Update the search term state
  
    // Filter cards based on the search term
    if (props.cards) {
      const filteredCards = Object.fromEntries(
        Object.entries(props.cards).map(([id, items]) => {
          // Check if items is an array before filtering
          if (Array.isArray(items)) {
            const filteredItems = items.filter(item =>
              item.tech.toLowerCase().includes(val)
            );
            return [id, filteredItems];
          }
          // If items is not an array, return the original items
          return [id, items];
        })
      );
      props.setFilteredCards(filteredCards);
    }
  };
  
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">DevPortFolio</span>
      </div>
      <div className="topbarCenter">
        <div className='search'>
          <input type="text" placeholder="Search..." value={props.searchTerm} onChange={handleChange} />
          <button>Search</button>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/profile" className="profile">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

