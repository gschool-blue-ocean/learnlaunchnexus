import React, {useEffect, useState} from 'react';
import Header from "../global/Header.jsx";
import Admin from '../admin/Admin.jsx'
import Student from '../student/Student.jsx'


const Dashboard = ({setAuth, userEmail}) => {
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState("");
    const [USER_ID, setUSER_ID] = useState(0)


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

    return (<>
      
      <div><h1>HEADER</h1></div>
      <div><h1>HORIZONTAL CONTAINER</h1>
      <div> <h1>View container</h1>
      <div>
        <Header admin={admin} />
        <h1 className="dashboard-page">Dashboard</h1>
        <h2>Welcome {name}</h2>
        <h3>Your email is {EMAIL}</h3>
        <h3>Your id is {USER_ID}</h3>
        <button onClick={e => logout(e)} className="logout-button">
          Logout
        </button>
      </div>
       {admin && <Admin USER_ID={USER_ID}></Admin>} 
       {!admin && <Student USER_ID={USER_ID}></Student>} 
       </div>
       <div><h1>VERTICAL CONTAINER</h1>
       <div><h1>CALENDER</h1></div>
       <div><h1>TODO LIST</h1></div>
       </div>
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
