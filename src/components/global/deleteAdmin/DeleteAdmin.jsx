import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DeleteAdmin.css'

const DeleteAdmin = () => {

    const [inputs, setInputs] = useState({
        Email : ""
    })
    
        const onSubmitForm = async (e) => {
            e.preventDefault();
            const email = inputs.Email
            try {
                  const res = await fetch(`${import.meta.env.VITE_API}/admins/delete/${email}`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: "PATCH",
    
                  });
                  const parseData = await res.json();
                  toast.success(`${email} is no longer an admin`)
                } catch (err) {
                  console.error(err.message);
                  toast.error(`Failed to remove admin access from ${email}`)
                }
            }
    
    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer />
            <form id='deleteAdminCon'>
            <h1 id='deleteAdminH'>Delete an Admin Email</h1>
            <input id="inputDeleAdmin"
                      type="text"
                      name="Email"
                      value={inputs.Email}
                      onChange={e => onChange(e)}
                      className="undefined"
                    />
                    <br></br>
            <button onClick={onSubmitForm} id='submitAdminDele' className="Submission">Submit</button>
            </form>
        </>
    )
}

export default DeleteAdmin