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

    const onClick = (e) => {
        console.log('inside onClick')
        onSubmitForm(e)
        window.location.href = "/dashboard"
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password }
            
            const response = await fetch(`https://production-learnlaunchnexus.onrender.com/authentication/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)

            })
            const parseRes = await response.json();
            console.log(parseRes.token)
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
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

        <form  >

            <input type="text" name="email" value={email} onChange={e => onChange(e)} className="input-field">

            </input>
       

        
            <input type="password"  name="password" value={password} onChange={e => onChange(e)} className="input-field">
             </input>
            <button onClick={onClick} className="submit-button"> submit </button>

        </form>
        <Link to="/register">
        Register 
        </Link>
        </>
    )
}

export default Login;