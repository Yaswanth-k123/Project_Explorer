/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Leftbar from "./Leftbar/Leftbar.jsx"
import "./Home.css";

export default function Home(props) {
  
    const navigate = useNavigate();
  const [cards, setCards] = useState([]); // State to store fetched cards
    const userId = props.id; // Assuming the user ID is passed as a prop

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/cards/`);
                props.setCards(response.data);
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, [userId]); // Dependency array includes userId to refetch when it changes

    const handleCard = (card) => {
        props.setSelectedCard({
            image: card.image,
            title: card.title
        });
        navigate("/details");
    };

    return (
        <div>
            <Leftbar />
    
            <div className='parent'>
                <div className='children'>
                    {Object.values(props.filteredCards).flat().map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Title - {item.title}</h5>
                                <p className="card-text">Tech - {item.tech}</p>
                                <p className="card-text">Desc - {item.content}</p>
                                <button onClick={() => handleCard(item)}>Visit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

*/ 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import Sidebar from '../Sidebar.jsx';
import Leftbar from "../Leftbar/Leftbar.jsx"
import "./Home.css";
import axios from 'axios';

export default function Home(props) {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]); // State to store fetched cards
    const userId = props.id; // Assuming the user ID is passed as a prop

    useEffect(() => {
        const fetchCards = async () => {
            try {
                console.log("Fetching cards for user:", userId);
                const response = await axios.get(`http://localhost:4000/api/cards`);
                console.log(typeof response.data);
                setCards(response.data); // Set fetched cards to the state
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, [userId]); // Dependency array includes userId to refetch when it changes

    useEffect(() => {
        console.log("asp")
        console.log(props.id);
        if (props.searchTerm) {
            const filtered = cards.filter(card =>
                card.tech.toLowerCase().includes(props.searchTerm.toLowerCase())
            );
            props.setFilteredCards(filtered);
        }
        else
        props.setFilteredCards(cards);
    }, [props.searchTerm, cards]); 
    const handleCard = (card) => {
        props.setSelectedCard({
            image: card.image,
            title: card.title
        });
        navigate("/details");
    };

    // Use the filteredCards state for rendering
    return (
        <div>
            <Leftbar />
            <div className='parent'>
                <div className='children'>
               
                {Object.values(props.filteredCards).flat().map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Title - {item.title}</h5>
                                <p className="card-text">Tech - {item.tech}</p>
                                <p className="card-text">Desc - {item.content}</p>
                                <button onClick={() => handleCard(item)}>Visit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
