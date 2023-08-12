import React, { useEffect, useState } from "react";
import "./App.module.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard"
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx"



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  useEffect(() => {
    checkAuthenticated()

  }, [])


  const checkAuthenticated = async () => {
    try {
      const res = await fetch(`/authentication/verify`, {
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
          !isAuthenticated ? (
            <Login setAuth={setAuth} />
          ) : (
            <Link to="/dashboard" />
          )
        )}
        />
        <Route 
        path = "/register"
        element={(
          !isAuthenticated ? (
            <Register setAuth={setAuth} />
          ) : (
            <Link to="/dashboard" />
          )
        )}
        /> 
        <Route 
        path = "/dashboard"
        element={(
          isAuthenticated ? (
            <Dashboard setAuth={setAuth} />
          ) : (
            <Link to="/login" />
          )
        )}
        /> 

      </Routes>

      </div>
    </Router>  
  )
  

};


export default App;
