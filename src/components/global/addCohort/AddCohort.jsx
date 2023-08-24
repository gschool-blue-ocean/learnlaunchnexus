import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddCohort.css";

const AddCohort = () => {
	const [inputs, setInputs] = useState({
		start_date: "", //date
		end_date: "", //date
		name: "", //text
	});

	/*
    router.post('/', async (req, res) => {
    const { start_date, end_date, name } = req.body;
    try {
        const result = await pool.query("INSERT INTO cohort (start_date, end_date, name) VALUES ($1, $2, $3) RETURNING *", 
                                        [start_date, end_date, name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
         res.status(500).json(err.message);
    }
});*/

	const onSubmitForm = async (e) => {
		e.preventDefault();
		const { start_date, end_date, name } = inputs;
		const body = { start_date, end_date, name };
		try {
			const res = await fetch(`${import.meta.env.VITE_API}/cohort`, {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify(body),
			});
			const parseData = await res.json();
			toast.success(`added a cohort`);
		} catch (err) {
			console.error(err.message);
			toast.error(`Failed to add a cohort`);
		}
	};

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	return (
		<>
			<ToastContainer />
			<form id='addCohortCon'>
				<h1 className='AddCohortsH'> Add a Start Date</h1>
				<input
					id='start_date'
					type='date'
					name='start_date'
					value={inputs.start_date}
					onChange={(e) => onChange(e)}
					className='Dates'
				/>
				<h1 className='AddCohortsH'> Add a End Date</h1>
				<input
					id='end_date'
					type='date'
					name='end_date'
					value={inputs.end_date}
					onChange={(e) => onChange(e)}
					className='Dates'
				/>
				<h1 className='AddCohortsH'> Cohorts Name</h1>
				<input
					id='name'
					type='text'
					name='name'
					value={inputs.name}
					onChange={(e) => onChange(e)}
					className='Dates'
				/>
				<br></br>
				<button onClick={onSubmitForm} id='submitAdmin' className='Submission'>
					Submit
				</button>
			</form>
		</>
	);
};
export default AddCohort;
