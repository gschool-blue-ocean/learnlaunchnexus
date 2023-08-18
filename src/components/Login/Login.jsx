import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Log.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        onSubmitForm(e)
        
    }

    const onSubmitForm = async (e) => {
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
                localStorage.setItem('email', JSON.stringify(email));    
                    window.location.href = "/dashboard"

            } else {
                setAuth(false);
                toast.error('Missing or Incorrect Credentials')
            }
        }
        catch (error) {
            console.error(error.message)
            toast.error("Incorrect Credentials")
            
        }
    }

    return (
        <>
        <ToastContainer />
                <div> 
                <div id='logpage'>
                    
                  <div id='log'>
                  <img id='logo' src={'/images/galvanizelogo.png'} ></img>
                  <h1 id='galhead' className="mt-5 text-center">Galvanize Services</h1>
                  <div id='loginput'>
                    <h2>Email</h2>
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
                  </div>
                  </>
    )
}

export default Login;
