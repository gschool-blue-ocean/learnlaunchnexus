import React, { useEffect, useState } from "react";
import StudentTable from "./StudentTable";
import StudentView from "./StudentView";
import ChooseCohort from "./ChooseCohort";
import "./admin.css";

const Admin = () => {
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [cohortList, setCohortList] = useState([]);
	const [currentCohort, setCurrentCohort] = useState("");
	const [assignmentData, setAssignmentData] = useState([]);
	const [studentList, setStudentList] = useState([]);
	const [students, setStudents] = useState([]);
	const [statusList, setStatusList] = useState([]);

	const handleStudentClick = (student) => {
		setSelectedStudent(student);
	};

	useEffect(() => {
		const getCohortData = async () => {
			try {
				const Cohortres = await fetch(`${import.meta.env.VITE_API}/cohort`, {
					method: "GET",
				});

				const parseCohortData = await Cohortres.json();
				setCohortList(parseCohortData); // sets a list to be used in cohort choice dropdown

				const Statusres = await fetch(`${import.meta.env.VITE_API}/tracking`, {
					method: "GET",
				});

				const parseStatusData = await Statusres.json();
				setStatusList(parseStatusData); // sets a list to be used in status change dropdown
			} catch (err) {
				console.error(err.message);
			}
		};
		getCohortData();
	}, []);

	useEffect(() => {
		const getCohortStudents = async () => {
			try {
				const resCohort = await fetch(
					`${import.meta.env.VITE_API}/cohort/${
						cohortList[currentCohort].id
					}/assignments`,
					{
						method: "GET",
					}
				);

				const parseCohortData = await resCohort.json();
				setStudentList(parseCohortData); // sets a student list based upon the selected cohort

				const resAssignment = await fetch(
					`${import.meta.env.VITE_API}/cohort_assignment/cohort/${
						cohortList[currentCohort].id
					}`,
					{
						method: "GET",
					}
				);
				const parseAssignmentData = await resAssignment.json(); // sets an array based off the Assignments a cohort has
				setAssignmentData(parseAssignmentData);

				const response = await fetch(
					`${import.meta.env.VITE_API}/students/byCohort/${
						cohortList[currentCohort].id
					}`,
					{
						method: "GET",
					}
				);
				const data = await response.json(); // retrieves a student list based off the current cohort
				setStudents(data);
			} catch (err) {
				console.error(err.message);
			}
		};
		getCohortStudents();
	}, [currentCohort]);

	// acts as our single page for the admin
	return (
		<div>
			<ChooseCohort
				cohortList={cohortList}
				setCurrentCohort={setCurrentCohort}
				resetSelectedStudent={setSelectedStudent}
			/>
			{selectedStudent ? (
				<StudentView
					statusList={statusList}
					students={students}
					studentID={selectedStudent}
					onBack={() => setSelectedStudent(null)}
					onStudentClick={handleStudentClick}
				/>
			) : (
				<StudentTable
					assignmentData={assignmentData}
					studentList={studentList}
					onStudentClick={handleStudentClick}
				/>
			)}
		</div>
	);
};

export default Admin;
