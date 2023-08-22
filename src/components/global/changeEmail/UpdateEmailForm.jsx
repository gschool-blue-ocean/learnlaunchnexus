import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Current Email:
                    <input
                        type="email"
                        value={`${localStorage.getItem('email')}`}
                        disabled
                    />
                </label>
                <label>
                    New Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </label>
                <button type="submit">Update Email</button>
            </form>

            {message && <div>{message}</div>}
        </div>
        </>
    );
}

export default UpdateEmailForm;
