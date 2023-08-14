import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import galvanizelogo from './assets/galvanizelogo.png'
// import * as dotenv from "dotenv";

import './Log.css'
// dotenv.config();
const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const { email, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onClick = (e) => {
        console.log('inside onClick')
        onSubmitForm(e)
        
    }

    const onSubmitForm = async (e) => {
        console.log('inside onSubmitForm')
        e.preventDefault();
        try {
            const body = { email, password }
            const response = await fetch(`${import.meta.env.VITE_API}/authentication/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)

            })
            const parseRes = await response.json();
            console.log(parseRes.token)
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                window.location.href = "/dashboard"
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
                  <img id='logo' src={galvanizelogo} ></img>
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
                    <button onClick={onClick} id='logbtn' className="btn btn-success btn-block">Login</button>
                  </form>
                  <br></br>
                  </div>
                  <br></br>
                  <Link to="/register">
                  <button id='reglin' >Register</button>
                  </Link>
                  </div>
                  </div>
                  </>
    )
}

export default Login;