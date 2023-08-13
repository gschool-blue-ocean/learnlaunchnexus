import React, {useEffect, useState} from 'react';

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");
    const [admin, setAdmin] = useState("");

    // const getProfile = async () => {
    //   try {
    //     console.log(email.current)
    //     let user_email = email.current
    //     const res = await fetch(`https://production-learnlaunchnexus.onrender.com/init/${user_email}`, {
    //       method: "GET",
    //     });
  
    //     const parseData = await res.json();
    //     setName(parseData.first_name);
    //     setAdmin(parseData.isadmin)
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // };
  
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
  
    // useEffect(() => {
    //   getProfile();
    // }, []);
  
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