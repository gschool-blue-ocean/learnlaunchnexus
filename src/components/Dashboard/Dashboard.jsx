import React, {useEffect, useState} from 'react';
import {reactLocalStorage, reactlocalstorage} from 'reactjs-localstorage'
const Dashboard = ({setAuth, userEmail}) => {
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState("");


    const getProfile = async (EMAIL) => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API}/init/${EMAIL}`, {
            method: "GET",
          });
  
          const parseData = await res.json();
          setName(parseData.first_name);
          setAdmin(parseData.isadmin)
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
      <div>
        <h1 className="dashboard-page">Dashboard</h1>
        <h2>Welcome {name}</h2>
        <h3>Your email is {EMAIL}</h3>
        <button onClick={e => logout(e)} className="logout-button">
          Logout
        </button>
      </div>
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