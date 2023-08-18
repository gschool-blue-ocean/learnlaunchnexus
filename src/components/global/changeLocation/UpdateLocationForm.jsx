import React, { useState } from 'react';

function UpdateLocationForm({USER_ID}) {
    // State to store the current ID input by user
     // State to store the new location input by user
    const [newLocation, setNewLocation] = useState('');
    // State to store any server response message
    const [message, setMessage] = useState('');

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a PUT request to update the user's location
            const response = await fetch(`${import.meta.env.VITE_API}/students/location/${USER_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location: newLocation }),
            });

            const responseData = await response.json();
            if (response.ok) {
                // Update the message state with the server's response
                setMessage('Location successfully updated');
            } else {
                setMessage(responseData.message || 'Error updating Location');
            }
            window.location.href = "../dashboard"

        } catch (err) {
            console.error(err);
            // Handle the error (e.g., by setting an error message state)
            setMessage('Error updating Location');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                </label>
                <label>
                    New Location:
                    <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                    />
                </label>
                <button type="submit">Update Location</button>
            </form>

            {message && <div>{message}</div>}
        </div>
    );
}

export default UpdateLocationForm;
