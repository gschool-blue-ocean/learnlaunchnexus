import React, {useState} from 'react';
import {Link} from "react-router-dom"
import "./reg.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({setAuth,setEmail,userEmail}) => { // user email is never used can it be removed
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
      });
    
      const { email, password, name } = inputs;
    
      const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

      const onClick = e => {
        onSubmitForm(e)

      }
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password, name };
          const response = await fetch(
            `${import.meta.env.VITE_API}/authentication/register`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
    
          if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            setEmail(email)
            window.location.href = "/dashboard"
          } else {
            setAuth(false);
            toast.error('Missing Credentials or Incorrect Format')
          }
        } catch (err) {
          console.error(err.message);
          toast.error('Missing Credentials')
        }
      };
    
      return (
        <>
          <ToastContainer />
          <diV id='regpage'>
          <div id='reg'>

          <img id='logo' src={'/images/galvanizelogo.png'}></img>
          <h1 id='reghead' className="mt-5 text-center">Galvanize Services Register</h1>


          <div id='reginput'>
          <form onSubmit={onSubmitForm}>
          <h2>Email</h2> 
            <input id='input1'
              type="text"
              name="email"
              value={email}
              placeholder="example@email.com"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
                        <br></br>
            <h2>Password</h2>
            <input id='input1'
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
                        <br></br>
            <h2>Username</h2>
            <input id='input1'
              type="text"
              name="name"
              value={name}
              placeholder="username"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
                        <br></br>
            <h2></h2>
            <button id='regbtn' onClick={onClick} className="btn btn-success btn-block">Register</button>
            </form>
          </div>
          <h2></h2>
          <Link to="/">
          <button id='loglin' >Login</button>
          </Link>
          </div>
        </diV>
        </>
      );
}

export default Register;
