import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './Header.module.css';
import settings from './settings-gear.svg'
//import galvanizelogo from '/public/galvanizelogo.png'
// import AssignmentModal from '../modal/AssignmentModal.jsx'
import SettingDropdown from './SettingDropdown';

const Header = ({ USER_ID, admin, setAuth, setClose }) => {

    const [name, setName] = useState(""); // State for user's name
    // const [isOpen, setIsModalOpen] = useState(false);
    const EMAIL = JSON.parse(localStorage.getItem('email'));

    const getUsername = async (EMAIL) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/users/init/${EMAIL}`, {
                method: "GET",
            });

            const parseData = await res.json();
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

    const logout = async e => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          setAuth(false);
          window.location.href = "../"
        } catch (err) {
          console.error(err.message);
        }
      };
 
    return (
        <div>  
        <header className={styles.appheader}>
            <h1 className={styles.apptitle}>{name}</h1> 

            <img className={styles.galvanize_logo} src={'/images/galvanizelogo.png'} ></img>
            <nav className={styles.navmenu}>
                <ul>
                    {/* <li><Link to="/dashboard">Home</Link></li> */}
                      
                    <SettingDropdown admin={admin} setClose={setClose}/>
                    <button onClick={e => logout(e)} className={styles.logbtn}>Logout</button>
                </ul>
                
            </nav>
         </header>
         </div>
    );
};

export default Header;
