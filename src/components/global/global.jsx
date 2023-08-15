import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './Header.module.css';
import settings from './settings-gear.svg'
import galvanizelogo from '../login/assets/galvanizelogo.png'
import SettingDropdown from './SettingDropdown';

const Header = ({ getProfile, admin }) => {

    const [name, setName] = useState(""); // State for user's name
    const EMAIL = JSON.parse(localStorage.getItem('email'));

    const getUsername = async (EMAIL) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/users/init/${EMAIL}`, {
        method: "GET",
      });

      const parseData = await res.json();
      console.log(parseData)
      return `${parseData.first_name} ${parseData.last_name}`;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const username = await getUsername(EMAIL); // Fetch the username
      setName(username); // Set the user's name
    };
    fetchData();
  }, [EMAIL]);

    return (
        <header className={styles.appheader}>
            <h1 className={styles.apptitle}>{name}</h1>
            <img className={styles.galvanize_logo} src={galvanizelogo} ></img>
            <nav className={styles.navmenu}>
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="/Contact-us"><a href="mailto:email@example.com">Contact Us</a>
                    </Link></li>

                    {/* <img className={styles.id} src={settings} ></img> */}
                    <SettingDropdown admin={admin}/>
                    <button className={styles.logbtn}>Log Out</button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
