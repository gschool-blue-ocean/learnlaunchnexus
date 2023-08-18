import React, {useState} from 'react';
import {Link} from "react-router-dom"
 import "./reg.css"
const FinishRegistration = () => { // user email is never used can it be removed
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: ""
      });
    
      const { first_name, last_name } = inputs;
    
      const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

      const onClick = e => {
        onSubmitForm(e)

      
      }
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { first_name, last_name, email: localStorage.getItem("email") };
          const response = await fetch(
            `${import.meta.env.VITE_API}/users`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
        } catch (err) {
          console.error(err.message);
        }
      };
    
      return (
        <>
          <diV id='regpage'>
          <div id='reg'>

          <img id='logo' src={'/images/galvanizelogo.png'}></img>
          <h1 id='reghead' className="mt-5 text-center">Galvanize Services Register</h1>


          <div id='reginput'>
          <form onSubmit={onSubmitForm}>
          <h2>First Name</h2> 
            <input id='input1'
              type="text"
              name="first_name"
              value={first_name}
              placeholder="first_name"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
                        <br></br>
            <h2>Last Name</h2>
            <input id='input1'
              type="password"
              name="last_name"
              value={last_name}
              placeholder="last_name"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <button id='regbtn' onClick={onClick} className="btn btn-success btn-block">Complete</button>
            </form>
          </div>
          </div>
        </diV>
        </>
      );
}

export default FinishRegistration;
