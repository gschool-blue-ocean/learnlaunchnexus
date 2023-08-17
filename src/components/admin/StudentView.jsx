
import { useEffect, useState } from "react";
import ChooseCohort from "./ChooseCohort"
import StudentTable from "./StudentTable";
import './admin.css';

const StudentView = ({ students, studentID, onBack }) => {
    // State Variables
    const [selectedStudentId, setSelectedStudentId] = useState(studentID);
    const [submissions, setSubmissions] = useState([]);

    console.log(studentID)

    const [feedbackInputs, setFeedbackInputs] = useState({})


    const onChange = (e) => {
        setFeedbackInputs({ [e.target.name]: e.target.value })
    }

    const handleSubmitFeedback = async (e) => {
        const feedbackName = e.target.name;
        const feedbackInput = feedbackInputs[feedbackName];
        const body = { "feedback": feedbackInput }
        // console.log(`${import.meta.env.VITE_API}/submission/${feedbackName}`);
        // console.log(body);
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/submission/${feedbackName}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)

            });
            const parseData = await res.json();
            //   console.log(parseData); // prints out what API returned after PATCH request
        } catch (err) {
            //   console.error(err.message);
        }
    }



    // Find the selected student object based on the selectedStudentId // this stays prop drill students

    const selectedStudent = students.find(student => student.id === selectedStudentId);
    console.log(selectedStudentId)
    // Handle changes in student selection from the dropdown // this stays
    const handleStudentChange = (event) => {
        console.log(handleStudentChange)
        setSelectedStudentId(Number(event.target.value));
    }

    // Fetch all students when the component mounts moved into the other fetches for current cohort 

    // Fetch submissions based on selectedStudentId this stays here
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



    return (
        <>
            {/* this stays here */}
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
                    <button onClick={onBack}>Back</button>


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
                                <input onChange={onChange} name={submission.submission_id} defaultValue={submission.feedback || ''} />

                                <button name={submission.submission_id} className="Submit-assignment" onClick={handleSubmitFeedback}>submit</button>
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
export default StudentView;

