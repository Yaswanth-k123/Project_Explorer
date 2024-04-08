import React, { useState,useEffect } from 'react';
import Details from '../details/Details';
import { Link, Routes, Route } from "react-router-dom";
import "./Form.css"
import { useNavigate } from 'react-router-dom';
import Leftbar from '../Leftbar/Leftbar';
import axios from 'axios';

function Form(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: null, // Use null for initial value of image
        title: '',
        tech: '',
        link: '',
        content: ''

    });
    const [showForm, setShowForm] = useState(false);
    const handleCard = (card) => {
        props.setSelectedCard({
            image: card.image,
            title: card.title,
            tech: card.tech,
            link: card.link,
            content: card.content
        })
        navigate("/details")
    }
    const handleDelete = (userId, cardIndex) => {
        props.setCards(prevCards => ({
            ...prevCards,
            [userId]: prevCards[userId].filter((_, index) => index !== cardIndex)
        }));
    };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    [name]: reader.result // Store the base64 string
                });
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    

    const handleClick = () => {
        setShowForm(false);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newCard = {
            userId: props.id, // Include the userId in the card details
            image: formData.image, // This is now a base64 string
            title: formData.title,
            tech: formData.tech,
            link: formData.link,
            content: formData.content
        };
        props.setCards(prevCards => {
            // Check if cards for the current user already exist
            if (prevCards.hasOwnProperty(props.id)) {
                // If yes, add the new card to the existing array
                return {
                    ...prevCards,
                    [props.id]: [...prevCards[props.id], newCard]
                };
            } else {
                // If no, create a new array with the new card
                return {
                    ...prevCards,
                    [props.id]: [newCard]
                };
            }
        });
           console.log("in form=");
           console.log(props.cards);
        setFormData({
            image: null,
            title: '',
            tech: '',
            link: '',
            content: ''
        });
        setShowForm(false);
    
        try {
            const response = await axios.post('http://localhost:4000/add-cards', newCard);
            console.log(response.data);
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };
    
    

    return (
        <div>
            <Leftbar />
            <button className='btn' onClick={() => setShowForm(true)}>Add Project</button>
            {showForm && (
                <form onSubmit={handleSubmit} className='form-container'>
                    <label className='form-label'>Image:</label>
                    <input
                        className='form-input'
                        type="text"
                        name="image"
                        onChange={handleChange}
                    />

                    <label className='form-label'>Title:</label>
                    <input
                        className='form-input'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label className='form-label'>Tech:</label>
                    <input
                        className='form-input'
                        type="text"
                        name="tech"
                        value={formData.tech}
                        onChange={handleChange}
                    />
                    <label className='form-label'>GitHub Link:</label>
                    <input
                        className='form-input'
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                    />
                    <label className='form-label'>Content:</label>
                    <textarea
                        className='form-textarea'
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
                    <button className='form-button' type="submit">Create</button>
                    <button className='form-button' onClick={handleClick}>Cancel</button>
                </form>
            )}

            {/* Iterate over the cards array and render each card */}
            <div className='parent'>
                <div className='children'>

                {Array.isArray(props.filteredCards[props.id]) && props.filteredCards[props.id].map((item, index) => (
                        <div key={index} className="card">
                            <img src={item.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Title - {item.title}</h5>
                                <p className="card-text">Tech - {item.tech}</p>
                                <p className="card-text">Desc - {item.content}</p>


                                <div className='footer'>
                                    <div>
                                        <button onClick={() => handleCard(item)}>Visit</button>

                                    </div>
                                    <div>
                                        <button onClick={() => handleDelete(props.id, index)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}

export default Form;
