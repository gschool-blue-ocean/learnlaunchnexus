import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AssignCohort.css'

const AssignCohort = () => {
    const [cohorts, setCohorts] = useState([]);
    const [unassigned, setUnassigned] = useState([]);

    useEffect(() => {

        const getCohortData = async () => {
    
          try {
            const Cohortres = await fetch(`${import.meta.env.VITE_API}/cohort`, {
              method: "GET",
            });
    
            const parseCohortData = await Cohortres.json();
            setCohorts(parseCohortData)
    
            const Unassignedres = await fetch(`${import.meta.env.VITE_API}/users/unassigned`, {
              method: "GET",
            });
    
            const parseUnassignedData = await Unassignedres.json();
            setUnassigned(parseUnassignedData)
    
    
          } catch (err) {
            console.error(err.message);
          }
    
        }
        getCohortData();
      }, []);

    const [inputs, setInputs] = useState({
        cohort_id: '0',
         user_id: '0'
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
    e.preventDefault();
    const { cohort_id, user_id } = inputs
    const body = {cohort_id, user_id}
    try {
          const res = await fetch(`${import.meta.env.VITE_API}/students`, {
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
    <form id='AssignCohortCon'>
    <h1 className='AssignCohortH'> Select a cohort</h1>
    <select className='CohortSelects' onChange={onChange} name="cohort_id">
    <option value="">Select a Cohort</option>
        {(cohorts.length > 0) && cohorts.map((cohort) => {
                               
            return (
                                        <option value={cohort.id}>{cohort.name}</option>
                                    )
                                
        })}
    </select>
    <h1 className='AssignCohortH'> Select an unassigned user</h1>
    <select className='CohortSelects' onChange={onChange} name="user_id">
    <option value="">Select a User</option>
        {(unassigned.length > 0) && unassigned.map((potential) => {
                               
            return (
                                        <option value={potential.id}>{potential.first_name} {potential.last_name}</option>
                                    )
                                
        })}
    </select>
    <br></br>
    <button onClick={onSubmitForm} id='submitAdmin' className="Submission">Submit</button>
    </form>
</>
)
}
export default AssignCohort;
