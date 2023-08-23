import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignAssignment = () => {
    const [cohorts, setCohorts] = useState([]);
    const [assignments, setAssignments] = useState([]);
    

    useEffect(() => {

        const getCohortData = async () => {
    
          try {
            const Cohortres = await fetch(`${import.meta.env.VITE_API}/cohort`, {
              method: "GET",
            });
    
            const parseCohortData = await Cohortres.json();
            setCohorts(parseCohortData)
    
            const Assignmentres = await fetch(`${import.meta.env.VITE_API}/assignment`, {
              method: "GET",
            });
    
            const parseAssignmentData = await Assignmentres.json();
            setAssignments(parseAssignmentData)
    
    
          } catch (err) {
            console.error(err.message);
          }
    
        }
        getCohortData();
      }, []);

    const [inputs, setInputs] = useState({
        cohort_id: 0,
        assignment_id: 0
    })
    
    /*
    router.post('/', async (req, res) => {
    const { cohort_id, user_id, desired_location, location } = req.body;
    try {
        const result = await pool.query("INSERT INTO student (cohort_id, user_id, desired_location, location) VALUES ($1, $2, $3, $4) RETURNING *",
            [cohort_id, user_id, desired_location, location]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
res.status(500).json(err.message);    }
});*/

const onSubmitForm = async (e) => {
    console.log('inside onSubmitForm')
    e.preventDefault();
    const { cohort_id, assignment_id } = inputs
    const body = {assignment_id, cohort_id}
    try {
          const res = await fetch(`${import.meta.env.VITE_API}/cohort_assignment`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(body)

          });
          const parseData = await res.json();
          toast.success(`assigned a student`)
        } catch (err) {
          console.error(err.message);
          toast.error(`Failed to assign a student`)
        }
    }

const onChange = (e) => {
setInputs({ ...inputs ,[e.target.name]: e.target.value })
}
return (
<>
    <ToastContainer />
    <form>
    <h1> Select a cohort</h1>
    <select onChange={onChange} name="cohort_id">
    <option value="">Select a Cohort</option>
        {(cohorts.length > 0) && cohorts.map((cohort) => {
                               
            return (
                                        <option value={cohort.id}>{cohort.name}</option>
                                    )
                                
        })}
    </select>
    <h1> Select an Assignment</h1>
    <select onChange={onChange} name="assignment_id">
    <option value="">Select an Assignment</option>
        {(assignments.length > 0) && assignments.map((assignment) => {
                               
            return (
                                        <option value={assignment.id}>{assignment.name}</option>
                                    )
                                
        })}
    </select>
    
    <button onClick={onSubmitForm} id='submitAdmin' className="Submission">Submit</button>
    </form>
</>
)
}
export default AssignAssignment;
