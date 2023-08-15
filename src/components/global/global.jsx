import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './Header.module.css';
import settings from './settings-gear.svg'
import galvanizelogo from '../login/assets/galvanizelogo.png'
import AssignmentModal from '../modal/AssignmentModal.jsx'

const Header = () => {

    const [name, setName] = useState(""); // State for user's name
    const [assignment, setAssignment] = useState(""); // State for assignment data
    const [isOpen, setIsModalOpen] = useState(false);
    const EMAIL = JSON.parse(localStorage.getItem('email'));
    const storedAssignment = JSON.parse(localStorage.getItem('assignment'));

    const getUsername = async (EMAIL) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/users/init/${EMAIL}`, {
                method: "GET",
            });

            const parseData = await res.json();
            console.log(parseData);
            return `${parseData.first_name} ${parseData.last_name} ${parseData.id}`;
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const username = await getUsername(EMAIL); // Fetch the username
            setName(username); // Set the user's name

            const userId = username.split(' ').pop(); // Extract the user ID from the full name and ID string
            fetchAssignmentData(userId); // Fetch assignment data using the user ID
        };

        fetchData(); // Fetch user's name
    }, [EMAIL]);

    // Define the fetchAssignmentData function
    const fetchAssignmentData = async (userId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/submission/student/${userId}`, {
                method: "GET",
            });

            const parseData2 = await res.json();
            console.log(parseData2);
            setAssignment(parseData2); // Set assignment data
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = () => {
        console.log('Opening modal');
        setIsModalOpen(true);
    };
    
 
    return (
        <header className={styles.appheader}>
            <h1 className={styles.apptitle}>{name}</h1>
            <div onClick={openModal}>Show Assignments</div>
             

            <img className={styles.galvanize_logo} src={galvanizelogo} ></img>
            <nav className={styles.navmenu}>
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="/Contact-us"><a href="mailto:email@example.com">Contact Us</a>
                    </Link></li>

                    <img className={styles.id} src={settings} ></img>
                    <button className={styles.logbtn}>Log Out</button>
                </ul>
                
            </nav>
            <AssignmentModal isOpen={isOpen} onRequestClose={() => setIsModalOpen(false)} assignments={assignment} />
         </header>
        
    );
};

export default Header;
