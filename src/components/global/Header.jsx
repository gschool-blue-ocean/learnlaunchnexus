import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './Header.module.css';
import settings from './settings-gear.svg'
import galvanizelogo from '/public/galvanizelogo.png'
// import AssignmentModal from '../modal/AssignmentModal.jsx'
import SettingDropdown from './SettingDropdown';
import UpdateEmailForm from './UpdateEmailForm.jsx'
import UpdateLocationForm from './UpdateLocationForm.jsx'
import UpdateDesiredLocationForm from './UpdateDesiredLocationForm.jsx'


const Header = ({ USER_ID, admin, setAuth }) => {

    const [name, setName] = useState(""); // State for user's name
    const [isOpen, setIsModalOpen] = useState(false);
    const EMAIL = JSON.parse(localStorage.getItem('email'));

    const getUsername = async (EMAIL) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/users/init/${EMAIL}`, {
                method: "GET",
            });

            const parseData = await res.json();
            console.log(parseData);
            return `${parseData.first_name} ${parseData.last_name}  `;
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const username = await getUsername(EMAIL); // Fetch the username
            setName(username); // Set the user's name

            const userId = username.split(' ').pop(); // Extract the user ID from the full name and ID string
        };

        fetchData(); // Fetch user's name
    }, [EMAIL]);

     
 
    return (
        <header className={styles.appheader}>
            <h1 className={styles.apptitle}>{name}</h1>
            <button><UpdateEmailForm/></button>
            <button><UpdateLocationForm USER_ID={USER_ID} /></button>
            <button><UpdateDesiredLocationForm USER_ID={USER_ID} /></button>

            <img className={styles.galvanize_logo} src={galvanizelogo} ></img>
            <nav className={styles.navmenu}>
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="/Contact-us"><a href="mailto:email@example.com">Contact Us</a>
                    </Link></li>

                    <SettingDropdown admin={admin}/>
                    <button onClick={e => logout(e)} className={styles.logbtn}>Logout</button>
                </ul>
                
            </nav>
         </header>
        
    );
};

export default Header;
