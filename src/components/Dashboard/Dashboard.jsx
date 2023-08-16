import React, { useEffect, useState } from 'react';
import Header from "../global/Header.jsx";
import Admin from '../admin/Admin.jsx'
import Student from '../student/Student.jsx'

import './Dashboard.css'
import Calendar from 'react-calendar';
import './Calendar.css'
import Todo from './TodoList/Todo.jsx'

const Dashboard = ({ setAuth, userEmail }) => {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");
  const [USER_ID, setUSER_ID] = useState(0)
  const [date, setDate] = useState(new Date())

const getProfile = async (EMAIL) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/users/init/${EMAIL}`, {
        method: "GET",
      });

      const parseData = await res.json();
      setName(parseData.first_name);
      setAdmin(parseData.isadmin)
      setUSER_ID(parseData.id)
      return parseData
    } catch (err) {
      console.error(err.message);
    }
  };
localStorage.setItem('user_id', JSON.stringify(USER_ID))
      
  
      
const EMAIL = JSON.parse(localStorage.getItem('email'))

const [location, setLocation] = useState("")
const [desiredLocation, setDesiredLocation] = useState("")

const getLocation = async (USER_ID) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API}/students/${USER_ID}`, {
      method: "GET",
    });
    
    const secondParseData = await res.json();
    setLocation(secondParseData.location);
    setDesiredLocation(secondParseData.desired_location)
    console.log('fulldata for location', secondParseData)
    return secondParseData
  } catch (err) {
    console.error(err.message);
  }
};

getProfile(EMAIL)
getLocation(USER_ID)
useEffect(() => {
  getProfile(EMAIL)
  getLocation(USER_ID)
}, [EMAIL, location, desiredLocation])

return (
  <>
      
      <div><h1>HORIZONTAL CONTAINER</h1></div>
      <div> <h1>View container</h1>
          <Header admin={admin} setAuth={setAuth} USER_ID={USER_ID} />
          <h1 className="dashboard-page">Dashboard</h1>
          <h2>Welcome {name}</h2>
          <h3>Your email is {EMAIL}</h3>
          <h3>Your id is {USER_ID}</h3>
          <h3>Your location is {location}</h3>
          <h3>Your desired location is {desiredLocation}</h3>
      </div>
      <div>
        {admin && <Admin USER_ID={USER_ID}></Admin>} 
        {!admin && <Student USER_ID={USER_ID}></Student>} 
      </div>
      <div>

        <div><h1>CALENDER</h1></div>
        <div><h1>TODO LIST</h1></div>
      </div>
      <div><h1>FOOTER</h1></div>
    </>
  );
}

export default Dashboard;


