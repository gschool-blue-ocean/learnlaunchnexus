import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteAdmin = () => {

    const [inputs, setInputs] = useState({
        Email : ""
    })
    
        const onSubmitForm = async (e) => {
            console.log('inside onSubmitForm')
            e.preventDefault();
            const email = inputs.Email
            try {
                  const res = await fetch(`${import.meta.env.VITE_API}/admins/delete/${email}`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: "PATCH",
    
                  });
                  const parseData = await res.json();
                  toast.success(`${email} is no longer an admin`)
                  setTimeout(() => {
                    window.location.href = "../dashboard"
                  }, 10000);
                } catch (err) {
                  console.error(err.message);
                }
            }
    
    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer />
            <form>
            <h1>Delete an Admin Email</h1>
            <input id="email"
                      type="text"
                      name="Email"
                      value={inputs.Email}
                      onChange={e => onChange(e)}
                      className="undefined"
                    />
            <button onClick={onSubmitForm} id='submitAdmin' className="Submission">Submit</button>
            </form>
        </>
    )
}

export default DeleteAdmin