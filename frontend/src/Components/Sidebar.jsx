import React from 'react'
import {Link} from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/home">All Projects</Link>
      <Link to="/myProjects">My Projects</Link>
    </div>
  )
}
