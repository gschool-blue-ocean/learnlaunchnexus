import React, {useState} from 'react';
const FinishRegistration = ({setUSER_ID}) => { // user email is never used can it be removed
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
        const localEmail = localStorage.getItem("email").split('"')
        console.log(localEmail)
        let email
        for(let i = 0; i < localEmail.length; i++)
        {
            if(localEmail[i].length > 3)
            {
                email = localEmail[i]
                console.log(email)

            }
        }
        e.preventDefault();
        try {
          const body = { first_name, last_name, email };
          console.log(body)
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
          setUSER_ID(parseRes.id)
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
          <h2 id='emailH'>First Name</h2> 
            <input id='input1'
              type="text"
              name="first_name"
              value={first_name}
              placeholder="first_name"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
                        <br></br>
            <h2 id='passwordH'>Last Name</h2>
            <input id='input1'
              type="text"
              name="last_name"
              value={last_name}
              placeholder="last_name"
              onChange={e => onChange(e)}
              className="form-control my-3"
            />
            <br></br>
            <h2></h2>
            <button id='regbtn' onClick={onClick} className="btn btn-success btn-block">Complete</button>
            </form>
          </div>
          </div>
        </diV>
        </>
      );
}

export default FinishRegistration;
