import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
            const response = await fetch("https://prod-api-b36y.onrender.com:10000/authentication/login", {
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
        <h1 className="login-page">
            Login
        </h1>

        <form  onSubmitForm={onSubmitForm} >

            <input type="text" name="email" value={email} onChange={e => onChange(e)} className="input-field">

            </input>
       

        
            <input type="password"  name="password" value={password} onChange={e => onChange(e)} className="input-field">
             </input>
            <button className="submit-button"> submit </button>

        </form>
        <Link to="/register">
        Register 
        </Link>
        </>
    )
}

export default Login;