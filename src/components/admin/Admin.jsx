import { useEffect, useState } from "react";
import chooseCohort from "./ChooseCohort"
import './admin.css';

const Admin = () => {
    // State Variables

    const [cohorts, setCohorts] = useState([]);
    const [currentcohort, setCurrrentCohort] = useState('')
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    async function getCohorts() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/cohort/`, {
                method: 'GET',
            })
            const data = await response.json()
            setCohorts(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    // Find the selected student object based on the selectedStudentId

    const selectedStudent = students.find(student => student.id === selectedStudentId);
    // Handle changes in student selection from the dropdown
    const handleStudentChange = (event) => {
        setSelectedStudentId(Number(event.target.value));
    }

    getCohorts()
    // useEffect(() => {
    // getName()
    // })

    // Fetch user details based on selectedStudentId (assumed to be EMAIL here)

    useEffect(() => {
        async function getCohorts() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API}/cohort/`, {
                    method: 'GET',
                })
                const data = await response.json()
                setCohorts(data)
            } catch (error) {
                console.error(error.message)
            }
        }

        getCohorts();
    }, []);

    // Fetch all students when the component mounts
    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API}/users`, {
                    method: 'GET',
                });
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchStudents();
    }, []);

    // Fetch submissions based on selectedStudentId

    useEffect(() => {
        async function fetchSubmissions() {
            if (selectedStudentId !== null && selectedStudentId !== "0") {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API}/submission/student/${selectedStudentId}`);
                    const data = await response.json();
                    setSubmissions(data);
                } catch (error) {
                    console.error(error.message);
                }
            }
        }

        fetchSubmissions();
    }, [selectedStudentId]);

    // Render the Admin Component

    return (
        <>
            {/* {!currentcohort (
                //map through cohorts and get each name and 
                //put it into a a dropdown menu was the idea
                <div>
                    <chooseCohort />
                </div>
            )}  */}

            <div className="Student-display">
                {/* Conditional Rendering of the Selected Student Name */}
                <h1>
                    {selectedStudent
                        ? `${selectedStudent.first_name} ${selectedStudent.last_name}`
                        : 'No Selected Student'
                    }
                </h1>

                <div className="custom-select" style={{ width: '200px' }}>
                    <select className="select" onChange={handleStudentChange} value={selectedStudentId || "0"}>
                        <option value="0" disabled>Select Student:</option>
                        {/* Map through students to display them as options in the dropdown */}
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {`${student.first_name} ${student.last_name}`}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            {/* <h1>Admin page for {name}</h1>
            <h1>Choose Cohort</h1>
            <form>
                <input></input>
                <button type="submit">Cohort</button>
            </form> */}

            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Add Feedback</th>
                        <th>Status</th>
                        <th>View Submission</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through submissions to create a row for each submission */}
                    {submissions.map(submission => (
                        <tr key={submission.submission_id}>
                            <td className="assignment-text">{submission.name}</td>
                            <td className="assignment-text">
                                <input defaultValue={submission.feedback || ''} />
                                <button className="Submit-assignment">submit</button>
                            </td>
                            <td className="assignment-text">{submission.status}</td>
                            <td className="assignment-text-submission">
                                {submission.info.startsWith('http') ?
                                    <a href={submission.info} target="_blank" rel="noopener noreferrer">Link</a>
                                    :
                                    submission.info
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Admin;
