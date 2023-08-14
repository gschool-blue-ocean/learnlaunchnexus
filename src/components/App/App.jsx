import React, { useEffect, useState, useRef, useContext } from "react";
import "./App.module.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard"
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx"
import { AppProvider } from "./AppContext.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const email = useRef('');
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
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
      <AppProvider>
      <div className="container" >
      <Routes>
        <Route 
        path = "/"
        element={(
          isAuthenticated ? (
            <Link to="/dashboard" />
          ) : (
            <Login setAuth={setAuth}/>
          )
        )}
        />
        <Route 
        path = "/register"
        element={(
          isAuthenticated ? (
            <Link to="/dashboard" />
          ) : (
            <Register setAuth={setAuth} />
          )
        )}
        /> 
        <Route 
        path = "/dashboard"
        element={(
          isAuthenticated ? (
            <Dashboard setAuth={setAuth} />
          ) : (
            <Link to="/" />
          )
        )}
        /> 

      </Routes>

      </div>
      </AppProvider>
    </Router>  
  )
  

};


export default App;
