import { Link } from 'react-router-dom'
import React, {useState} from 'react'


const AddAdmin = () => {

    const [inputs, setInputs] = useState({
        Email : ""
    })
    
        const onSubmitForm = async (e) => {
            console.log('inside onSubmitForm')
            e.preventDefault();
            const email = inputs.Email
            try {
                  const res = await fetch(`${import.meta.env.VITE_API}/admins/add/${email}`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: "PATCH",
    
                  });
                  const parseData = await res.json();
                } catch (err) {
                  console.error(err.message);
                }
            }
    
    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>you can add an admin yooo</h1>
            <form>
            <h1>Admin Email</h1>
            <input id="email"
                      type="text"
                      name="Email"
                      value={inputs.Email}
                      onChange={e => onChange(e)}
                      className="undefined"
                    />
            <button onClick={onSubmitForm} id='submitAdmin' className="Submission">Submit</button>
            </form>
            <Link to="../dashboard">
                <button>Cancel</button>
            </Link>
        </>
    )
}

export default AddAdmin