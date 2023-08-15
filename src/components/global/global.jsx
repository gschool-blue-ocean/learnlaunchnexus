import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './Header.module.css';
import settings from './settings-gear.svg'
import galvanizelogo from '../login/assets/galvanizelogo.png'

const Header = () => {
    return (
        <header className={styles.appheader}>
            <h1 className={styles.apptitle}>First Name Last Name</h1>
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
        </header>
    );
};

export default Header;
