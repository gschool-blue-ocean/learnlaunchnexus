import React, {useState} from 'react';
import {Link} from "react-router-dom"
import galvanizelogo from './assets/galvanizelogo.png'
 import "./reg.css"
//  import * as dotenv from "dotenv";
//  dotenv.config()
const Register = ({setAuth,setEmail,userEmail}) => {
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

        window.location.href = '/dashboard'
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
            console.log(`email in the form is ${email}`);
            console.log(`useContext userEmail is ${userEmail}`);
            window.location.href = "/dashboard"
          } else {
            setAuth(false);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
    
      return (
        <>
          <diV id='regpage'>
          <div id='reg'>
          <img id='logo' src={galvanizelogo}></img>
          <h1 className="mt-5 text-center">Galvanize Services Register</h1>
          <div id='reginput'>
          <form onSubmit={onSubmitForm}>
          <h2>Email</h2> 
            <input
              type="text"
              name="email"
              value={email}
              placeholder="email"
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
              placeholder="name"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
                        <br></br>
            <h2></h2>
            <button id='logbtn' onClick={onClick} className="btn btn-success btn-block">Register</button>
            </form>
          </div>
          <h2></h2>
          <Link id='reglin' to="/">Login</Link>
          </div>
        </diV>
        </>
      );
}

export default Register;
