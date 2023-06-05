import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './EditProfile.css'
import HeaderWithoutIcons from "../../../components/header/HeaderWithoutIcons";
import HeaderAuthor from "../../../components/header/HeaderAuthor";

const EditAuthor = () => {
    const navigate = useNavigate();
    const [alias, setAlias] = useState('');
    const [aboutYou, setAboutYou] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(localStorage.token);

        const authorData = {
            alias,
            about_you: aboutYou,
            image,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://192.168.0.23:8000/bubooks/modify-author', authorData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('Author profile has been successfully created');
                // Redirigir al perfil del autor con el alias como parámetro de la URL
                navigate(`/authorProfile/${alias}`);
            } else {
                console.log('Error creating author profile:', response.data.message);
            }
        } catch (error) {
            console.error('Error creating author profile:', error);
        }
    };

    return (
        <div className="editUser">
            <HeaderAuthor/>
            <div className="editUserContainer">
                <h2 className="editUserH2">Edit your profile</h2>
                <form className='editUserForm' onSubmit={handleSubmit}>
                    <label htmlFor="alias">Alias:</label>
                    <input
                        type="text"
                        id="alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        required
                    />

                    <label htmlFor="aboutYou">About You:</label>
                    <textarea
                        id="aboutYou"
                        value={aboutYou}
                        onChange={(e) => setAboutYou(e.target.value)}
                        required
                    ></textarea>

                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />

                    <button type="submit" className='editUserButton'>Edit Profile</button>
                </form>
            </div>

        </div>
    );
};

export default EditAuthor;
