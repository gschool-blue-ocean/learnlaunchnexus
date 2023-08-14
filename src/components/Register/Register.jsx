import React, {useState} from 'react';
import {Link} from "react-router-dom"
import "./reg.css"

const Register = ({setAuth}) => {
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
            `http://localhost:10000/authentication/register`,
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
          <img id='logo' src='public/Galvanizelogo.png'></img>
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