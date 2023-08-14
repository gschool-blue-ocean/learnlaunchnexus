import React, {useEffect, useState, useContext} from 'react';
import AppContext from "../App/AppContext";

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState("");

    const { userEmail, setUserEmail, user, setUser } = useContext(AppContext);
 
  
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
        <h1 className="dashboard-page">Dashboard</h1>
        <h2>Welcome {name}</h2>
        <h3>Your email per useContext is {userEmail}</h3>
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