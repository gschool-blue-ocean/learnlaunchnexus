import { useState, useEffect } from "react";

const ChooseCohort = ({
	cohortList,
	setCurrentCohort,
	resetSelectedStudent,
}) => {
	const handleChange = (e) => {
		e.preventDefault();
		setCurrentCohort(e.currentTarget.value);
		resetSelectedStudent(null); // Reset the selected student
	};

	return (
		<>
			<label htmlFor='cohort-select'>Select Cohort</label>
			<select
				name='cohort-dropdown'
				id='cohort-select'
				onChange={(e) => handleChange(e)}
			>
				<option value=''>Select a Cohort</option>
				{cohortList.map((cohort, index) => {
					return (
						<option key={index} value={index}>
							{cohort.name}
						</option>
					);
				})}
				;
			</select>
		</>
	);
};

export default ChooseCohort;
