
import { useEffect, useState } from "react";
import ChooseCohort from "./ChooseCohort"
import StudentTable from "./StudentTable";
import './admin.css';

const Admin = () => {
    // State Variables

    const [cohorts, setCohorts] = useState([]);
    const [cohortList, setCohortList] = useState([]);
    const [currentCohort, setCurrentCohort] = useState('')
    const [studentList, setStudentList] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [assignmentData, setAssignmentData] = useState([]);

    
    // Find the selected student object based on the selectedStudentId

    const selectedStudent = students.find(student => student.id === selectedStudentId);
    // Handle changes in student selection from the dropdown
    const handleStudentChange = (event) => {
        setSelectedStudentId(Number(event.target.value));
    }

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
    
    useEffect( () => {
        
        const getCohortData = async () => {
            
            try {
                const res = await fetch(`${import.meta.env.VITE_API}/cohort`, {
                    method: "GET",
                  });
          
                  const parseData = await res.json();
                  setCohortList(parseData)
                } catch (err) {
                  console.error(err.message);
                }

        }
        getCohortData();
    }, []);

 // this should execute
    useEffect( () => {
        
        const getCohortStudents = async () => {
            
            try {
                const resCohort = await fetch(`${import.meta.env.VITE_API}/cohort/${cohortList[currentCohort].id}/assignments`, {
                    method: "GET",
                  });
          
                  const parseCohortData = await resCohort.json();
                  setStudentList(parseCohortData);



                  const resAssignment = await fetch(`${import.meta.env.VITE_API}/cohort_assignment/cohort/${cohortList[currentCohort].id}`, {
                    method: "GET"
                  });
                  const parseAssignmentData = await resAssignment.json();
                  setAssignmentData(parseAssignmentData)
                } catch (err) {
                  console.error(err.message);
                }

        }
        getCohortStudents();
    }, [currentCohort]);
    
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
            <ChooseCohort cohortList={cohortList} setCurrentCohort={setCurrentCohort}/>
            <StudentTable assignmentData={assignmentData} studentList={studentList}/>
            
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

