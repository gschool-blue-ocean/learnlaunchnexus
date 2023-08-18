import React, { useEffect, useState, useRef } from "react";
import "./App.module.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard"
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx"
import ChangeEmail from "../changeEmail/ChangeEmail";
import ChangeDesiredLocation from "../changeDesiredLocation/ChangeDesiredLocation";
import ChangeLocation from "../changeLocation/ChangeLocation";
import AddAdmin from "../addAdmin/AddAdmin";



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const setEmail = (str) => {
    setUserEmail(str);
  }


  useEffect(() => {
    checkAuthenticated()

  }, [])


  const checkAuthenticated = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/authentication/verify`, {
        method: "GET",
        headers: { token: localStorage.token }

      })
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    }
    catch (error) {
      console.error("Error message")
    }
  }

  return (
    <Router>
    
      <div className="container" >
      <Routes>
        <Route 
        path = "/"
        element={(
          isAuthenticated ? (
            <Navigate to= "/dashboard" replace/>
          ) : (
            <Login setAuth={setAuth} setEmail={setEmail} userEmail={userEmail}/>
          )
        )}
        />
        <Route 
        path = "/register"
        element={(
          isAuthenticated ? (
            <Navigate to= "/dashboard" replace />
          ) : (
            <Register setAuth={setAuth} setEmail={setEmail} userEmail={userEmail}/>
          )
        )}
        /> 
        <Route 
        path = "/dashboard"
        element={(
          isAuthenticated ? (
            <Dashboard setAuth={setAuth} userEmail={userEmail}/>
          ) : (
            <Navigate to="/" replace/>
          )
        )}
        /> 

        <Route
        path = "change-email"
        element ={(
          <ChangeEmail/>
        )}
        />

        <Route
        path = "change-location"
        element ={(
          <ChangeLocation />
        )}
        />

        <Route
        path = "change-desired-location"
        element ={(
          <ChangeDesiredLocation />
        )}
        />

        <Route
        path = "add-admin"
        element ={(
          <AddAdmin />
        )}
        />

        <Route
        path = "/*"
        element = {<Navigate to="/" replace />}
        />

        </Routes>
       </div>
 
    </Router>  
    
  )


};


export default App;
