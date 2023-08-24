import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddAdmin.css'

const AddAdmin = () => {

    const [inputs, setInputs] = useState({
        Email : ""
    })
    
        const onSubmitForm = async (e) => {
            e.preventDefault();
            const email = inputs.Email
            try {
                  const res = await fetch(`${import.meta.env.VITE_API}/admins/add/${email}`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: "PATCH",
    
                  });
                  const parseData = await res.json();
                  toast.success(`${email} is now an admin`)
                } catch (err) {
                  console.error(err.message);
                  toast.error(`Failed to add ${email} as an admin`)
                }
            }
    
    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer />
            <form id='newAdminCon'>
            <h1 id='newAdminH'> Add an Admin Email</h1>
            <input id="inputNewAdmin"
                      type="text"
                      name="Email"
                      value={inputs.Email}
                      onChange={e => onChange(e)}
                      className="undefined"
                    />
                    <h2></h2>
            <button onClick={onSubmitForm} id='submitAdmin' className="Submission">Submit</button>
            </form>
        </>
    )
}

export default AddAdmin