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


        <div className="dashboard-container">

          <div className="dashboard-page">
            <div className="profile">
              <div className="header">
                <h1>Welcome, {name} !

                  {/*<button onClick={e => logout(e)} className="logout-button" > Logout</button>*/}

                </h1>
              </div>
              <div className="profile-info">
                <h2>Welcome {name}</h2>

                {!admin && <h3>Your location is {location}</h3>}
                {!admin && <h3>Your desired location is {desiredLocation}</h3>}
              </div>



            </div>
            <div>
              {admin && <Admin USER_ID={USER_ID}></Admin>}
              {!admin && <Student USER_ID={USER_ID}></Student>}
            </div>
          </div>
          <h1>VERTICAL CONTAINER
            <div className="calendar">
              <h1 className="calendar-header">Calendar</h1>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
              <div className="text-center">
                Selected date: {date.toDateString()}
              </div>


            </div>
            <Todo />
          </h1>
        </div>


      </div>
      <div>

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


