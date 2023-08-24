import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ChangeLocation.css";

function UpdateLocationForm({ USER_ID }) {
	// State to store the current ID input by user
	// State to store the new location input by user
	const [newLocation, setNewLocation] = useState("");
	// State to store any server response message
	const [message, setMessage] = useState("");

	// Function to handle the form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Send a PUT request to update the user's location
			const response = await fetch(
				`${import.meta.env.VITE_API}/students/location/${USER_ID}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ location: newLocation }),
				}
			);

			const responseData = await response.json();
			if (response.ok) {
				// Update the message state with the server's response
				setMessage("Location successfully updated");
				toast.success("Successfully changed location");
			} else {
				setMessage(responseData.message || "Error updating Location");
				toast.error("Failed to change location");
			}
		} catch (err) {
			console.error(err);
			// Handle the error (e.g., by setting an error message state)
			setMessage("Error updating Location");
		}
	};

	return (
		<>
			<ToastContainer />
			<div id='locationCon'>
				<form onSubmit={handleSubmit}>
					<label></label>
					<label id='locationH'>
						New Location:
						<br></br>
						<h2></h2>
						<input
							id='InputLocation'
							type='text'
							value={newLocation}
							onChange={(e) => setNewLocation(e.target.value)}
						/>
					</label>
					<br></br>
					<h2></h2>
					<button id='updateLocation' type='submit'>
						Update Location
					</button>
				</form>

				{message && <div>{message}</div>}
			</div>
		</>
	);
}

export default UpdateLocationForm;
