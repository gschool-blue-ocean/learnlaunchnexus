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
      console.log('fulldata', parseData)
      console.log('user_id', USER_ID)
      setUSER_ID(parseData.id)
      console.log('fulldata', parseData)
      console.log('user_id', USER_ID)
      return parseData
    } catch (err) {
      console.error(err.message);
    }
  };
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


  const EMAIL = JSON.parse(localStorage.getItem('email'))
  getProfile(EMAIL)

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
                <div>
                  <span>Cohort: MCSP-22 </span>
                </div>
                <div>
                  <span>Desired Location: Planet Earth</span>
                </div>
                <div>
                  <span>Location: New York City, NY</span>
                </div>
              </div>



            </div>
<<<<<<< Updated upstream
            <div>
              {admin && <Admin USER_ID={USER_ID}></Admin>}
              {!admin && <Student USER_ID={USER_ID}></Student>}
            </div>
=======

            {admin && <Admin USER_ID={USER_ID}></Admin>}
            {!admin && <Student USER_ID={USER_ID}></Student>}

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
        
      </div>
      <div>
>>>>>>> Stashed changes

        <div><h1>CALENDER</h1></div>
        <div><h1>TODO LIST</h1></div>
      </div>
      <div><h1>FOOTER</h1></div>
    </>
  );
}

export default Dashboard;





// const Dashboard = ({setAuth}) => {

//     const onClick = () => {
//         localStorage.token = ''
//         setAuth(false)
//         setTimeout(window.location.href = '../', 30000)
//     }
//  return (
//     <>
//         <h1>Dashboard</h1>
//         <button onClick={onClick}>logout</button>

//         {/* !isAdmin ? (
//             <admin setAuth={setAuth} />
//           ) : (
//             <student to="/dashboard" />
//           ) */}



//     </>
//  )
// }

// export default Dashboard;
