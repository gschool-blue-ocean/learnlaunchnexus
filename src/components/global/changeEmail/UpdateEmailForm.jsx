import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ChangeEM.css';

function UpdateEmailForm() {
    // State to store the new email input by user
    const [newEmail, setNewEmail] = useState('');
    // State to store any server response message
    const [message, setMessage] = useState('');

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(newEmail))
            {
            try {
                // Send a PUT request to update the user's email
                const response = await fetch(`${import.meta.env.VITE_API}/users/update-email/${localStorage.getItem('email')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: newEmail }),
                });

                const responseData = await response.json();
                if(response.ok){
                    // Update the message state with the server's response
                    setMessage(responseData.message);
                } else {
                    setMessage(responseData.message || 'Error updating email');
                }
                localStorage.removeItem('email')
                localStorage.setItem('email', JSON.stringify(newEmail))
                toast.success("Successfully changed email")
                
            }
            catch (err) {
                console.error(err);
                // Handle the error (e.g., by setting an error message state)
                setMessage('Error updating email');
                toast.error("Failed to change email")
            }
        }
    };

    return (
        <>
        <ToastContainer />
        <div id='emailToast'>
            <form onSubmit={handleSubmit}>
                <label id='currentE'>
                    Current Email:
                    <br></br>
                    <h2></h2>
                    <input id='InputCurrentE'
                        type="email"
                        value={`${localStorage.getItem('email')}`}
                        disabled
                    />
                    <br></br>
                    <h2></h2>
                </label>
                <label id='oldE'>
                    New Email:
                    <br></br>
                    <h2></h2>
                    <input id='inputOldE'
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <br></br>
                    <h2></h2>
                </label>
                <button id='updateEM' type="submit">Update Email</button>
            </form>

            {message && <div>{message}</div>}
        </div>
        </>
    );
}

export default UpdateEmailForm;
