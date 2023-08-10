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
      const res = await fetch("http://localhost:8000/authentication/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }

      })
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    }
    catch (error) {
      console.error("Error message")
    }
  }





  
  return (    /*<main>
      <h2>Tasks</h2>
      <div className={c.tasks}>
        {tasks.length > 0 ? (
          tasks.map(({ id, description }) => (
            <div key={id}>
              <button onClick={() => deleteTask(id)}>X</button>
              <span>{description}</span>
            </div>
          ))
        ) : (
          <span>No Tasks Remaining</span>
        )}
      </div>
      <h2>Counter</h2>
      <Counter />
    </main>
  ;*/
    <Router>

      <div className="container" >
      <Routes>
        <Route 
        exact path = "/login"
        render = {props => 
          !isAuthenticated ? (
            <Login {...props} setAuth={setAuth} />
          ) : (
            <Link to="/dashboard" />
          )
        }
        /> 

        <Route 
        exact path = "/register"
        render = {props => 
          !isAuthenticated ? (
            <Register {...props} setAuth={setAuth} />
          ) : (
            <Link to="/dashboard" />
          )
        }
        /> 

        <Route 
        exact path = "/dashboard"
        render = {props => 
          !isAuthenticated ? (
            <Dashboard {...props} setAuth={setAuth} />
          ) : (
            <Link to="/login" />
          )
        }
        /> 

      </Routes>

      </div>
    </Router>
  )
};

export default App;
