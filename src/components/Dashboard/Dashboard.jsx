import React, {useEffect, useState} from 'react';

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
      try {
        const res = await fetch("https://production-learnlaunchnexus.onrender.com/users", {
          method: "GET",
          headers: { token: localStorage.token }
        });
  
        const parseData = await res.json();
        setName(parseData.user_name);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const logout = async e => {
      e.preventDefault();
      try {
        localStorage.removeItem("token");
        setAuth(false);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []);
  
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




    return (
      <div>
        <h1 className="dashboard-page">Dashboard</h1>
        <h2>Welcome {name}</h2>
        <button onClick={e => logout(e)} className="logout-button">
          Logout
        </button>
      </div>
    );
}

export default Dashboard;