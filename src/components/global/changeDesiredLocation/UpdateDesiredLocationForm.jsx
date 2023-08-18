import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateDesiredLocationForm({USER_ID}) {
      // State to store the new location input by user
    const [newDesiredLocation, setNewDesiredLocation] = useState('');
    // State to store any server response message
    const [message, setMessage] = useState('');


    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a PUT request to update the user's location
            const response = await fetch(`${import.meta.env.VITE_API}/students/desired-location/${USER_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ desired_location : newDesiredLocation }),
            });

            const responseData = await response.json();
            if (response.ok) {
                // Update the message state with the server's response
                setMessage('Location successfully updated');
                toast.success("Successfully changed desired location")
            } else {
                setMessage(responseData.message || 'Error updating Location');
                toast.error("Failed to change desired location")
            }

        } catch (err) {
            console.error(err);
            // Handle the error (e.g., by setting an error message state)
            setMessage('Error updating Location');
        }
    };

    return (
        <>
        <ToastContainer />
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                </label>
                <label>
                    New  Desired Location:
                    <input
                        type="text"
                        value={newDesiredLocation}
                        onChange={(e) => setNewDesiredLocation(e.target.value)}
                    />
                </label>
                <button type="submit">Update Desired Location</button>
            </form>

            {message && <div>{message}</div>}
        </div>
        </>
    );
}

export default UpdateDesiredLocationForm;
