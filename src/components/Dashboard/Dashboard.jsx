import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from "../global/Header.jsx";
import Admin from '../admin/Admin.jsx'
import Student from '../student/Student.jsx'
import './Dashboard.css'
const Calendar = lazy(() => import('react-calendar'))
import './Calendar.css'
const Todo = lazy(() => import('./TodoList/Todo.jsx'))
import Footer from './Footer/Footer.jsx'
import FinishRegistration from '../FinishRegistration/FinishRegistration.jsx';
const Dashboard = ({ setAuth, userEmail }) => {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");
  const [USER_ID, setUSER_ID] = useState(0)
  const [date, setDate] = useState(new Date())
  const [close, setClose] = useState(true)
  const [gitPic, setGitPic] = useState('/images/Default.png')

  const getProfile = async (EMAIL) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/users/init/${EMAIL}`, {
        method: "GET",
      });

      const parseData = await res.json();
      setName(parseData.first_name);
      setAdmin(parseData.isadmin)
      if((parseData.id === null) || (parseData.id === undefined))
      {
      }
      else
      {
        setUSER_ID(parseData.id)
      }
      if((parseData.github_acct === null) || (parseData.github_acct === undefined))
      {
      }
      else
      {
        setGitPic(parseData.github_acct)
      }
      
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
      return secondParseData
    } catch (err) {
      console.error(err.message);
    }
  };

  getProfile(EMAIL)
  getLocation(USER_ID)
  
  useEffect(() => {
    const fetchData = async () => {

      const profileData = await getProfile(EMAIL)
        setName(profileData.first_name);
        setAdmin(profileData.isadmin);
        setUSER_ID(profileData.id)
        setGitPic(profileData.github_acct)

      const locationData = await getLocation(USER_ID)
        setLocation(locationData.location);
        setDesiredLocation(locationData.desired_location);
    };
    fetchData()
  }, [location, desiredLocation, EMAIL, USER_ID])

  if(USER_ID > 0)
  {
  return (
    <>
        <div>
        <Header admin={admin} setAuth={setAuth} USER_ID={USER_ID} setClose={setClose} />
        </div>
       
        <div>   {/* <h1>View container</h1> */}

 

        <div className="dashboard-container">

          <div className="dashboard-page">
            <div className="profile">
              <div className="header">
                <img style={{ width: '125px', height:'125px', border:'1px solid white', borderRadius:'50%'}} src={`https://avatars.githubusercontent.com/${gitPic}`}></img>
                <h1>Welcome, {name} !</h1>
                <div style={{width: '125px', height: '125px'}}></div>
              </div>
              <div className="profile-info">
                {!admin && <h3>Location: {location}</h3>}
                {!admin && <h3>Desired Location: {desiredLocation}</h3>}
              </div>



            </div>
            <div>
              {admin && <Admin USER_ID={USER_ID} ></Admin>}
              {!admin && <Student USER_ID={USER_ID} close={close}></Student>}
            </div>
          </div>
          <h1>
            <div className="calendar">
              <h1 className="calendar-header">Calendar</h1>
              <div className="calendar-container">
              <Suspense fallback=
                {<div>Loading...</div>}>
                <Calendar onChange={setDate} value={date} />
              </Suspense>
              </div>
              <div className="text-center">
                Selected date: {date.toDateString()}
              </div>


            </div>
              <Todo USER_ID={USER_ID}/>
          </h1>
        </div>
      </div>
      <Footer/>

    </>
    );
  }
  
  return <h1>Loading Learn Launch Nexus.....</h1>
}
export default Dashboard;


