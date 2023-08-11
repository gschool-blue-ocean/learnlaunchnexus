import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Log.css'

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const { email, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password }
            const response = await fetch("http://localhost:8000/authentication/login", {
                method: "POST",
                headers: { "content-type": "application.json" },
                body: JSON.stringify(body)

            })
            const parseRes = await res.json();
            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
            } else {
                setAuth(false);
            }
        }
        catch (error) {
            console.error("Error message")
        }
    }



    return (
        <>
        <div id='logpage'>
          <div id='log'>
          <img id='logo' src='public/Galvanizelogo.png'></img>
          <h1 id='galhead' className="mt-5 text-center">Galvanize Services</h1>
          <div id='loginput'>
            <h2>Username</h2>
          <form onSubmit={onSubmitForm}>
            <input id='input1'
              type="text"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <br></br>
            <h2>Password</h2>
            <input id='input2'
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <br></br>
            <h2></h2>
            <button id='logbtn' class="btn btn-success btn-block">Login</button>
          </form>
          <br></br>
          </div>
          <br></br>
          <a href="/register">
          <button id='reglin' to="/register">Register</button>
          </a>
          </div>
          </div>
        </>
    )
}

export default Login;