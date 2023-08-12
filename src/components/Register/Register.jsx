import React, {useState} from 'react';
import {Link} from "react-router-dom"
const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
      });
    
      const { email, password, name } = inputs;
    
      const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password, name };
          const response = await fetch(
            `https://production-learnlaunchnexus.onrender.com/authentication/register`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
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
          <h1 className="register-page">Register</h1>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="email"
              onChange={e => onChange(e)}
              className="input-field"
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={e => onChange(e)}
              className="input-field"
            />
            <input
              type="text"
              name="name"
              value={name}
              placeholder="name"
              onChange={e => onChange(e)}
              className="input-field"
            />
            <button className="submit-button">Submit</button>
          </form>
          <Link to="/">login</Link>
        </>
      );
}

export default Register;