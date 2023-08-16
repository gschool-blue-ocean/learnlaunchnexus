import React, { useState } from 'react';

function UpdateEmailForm() {
    // State to store the current email input by user
    const [currentEmail, setCurrentEmail] = useState('');
    // State to store the new email input by user
    const [newEmail, setNewEmail] = useState('');
    // State to store any server response message
    const [message, setMessage] = useState('');

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a PUT request to update the user's email
            const response = await fetch(`${import.meta.env.VITE_API}/users/update-email/${currentEmail}`, {
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
            window.location.href = '../dashboard'
            
        } catch (err) {
            console.error(err);
            // Handle the error (e.g., by setting an error message state)
            setMessage('Error updating email');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Please Verify Current Email:
                    <input
                        type="email"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
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
    );
}

export default UpdateEmailForm;
