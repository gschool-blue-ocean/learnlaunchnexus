import { useState, useEffect } from 'react';
import "./sub.css"


// user_id, assignment_id, name, submission_time,  status, feedback
const Submission = ({assignment, index}) => {
    const [inputs, setInputs] = useState({
        info : assignment.info
    })
    const [statusColor, setColorStatus] = useState('')

    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
    
        e.preventDefault();
        let currentTime = new Date(Date.now());
        currentTime = currentTime.toISOString();
    
        const body = {"info": inputs.info, "submission_time": currentTime}

        try {
              const res = await fetch(`${import.meta.env.VITE_API}/submission/${assignment.submission_id}`, {
                method: "PATCH",
                headers: { 
                  Accept: "application/json",
                  'Content-Type': 'application/json'},
                body: JSON.stringify(body)

              });
              const parseData = await res.json();
              //assignment = parseData why is this commented out
            } catch (err) {
              console.error(err.message);
            }
        }

  function dateSub (timestamp) {
    const date = new Date(timestamp)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let year = date.getFullYear()
    let hour = date.getHours()
    let min = date.getMinutes()
    if (hour === 0) {
      hour = 12
    }
    if (min < 10) {
      min = '0' + min
    }
    if (hour > 12) {
      let pm = hour - 12
      return `Submitted at ${pm}:${min} pm on ${month}/${day}/${year}`
    }
    return `Submitted at ${hour}:${min} am on ${month}/${day}/${year}`
  }

  useEffect(() => {
    if (assignment.status === 'Complete') {
      setColorStatus('assignStatusG');
    } else if (assignment.status === 'Not Started') {
      setColorStatus('assignStatusY')
    } else if (assignment.status === 'OverDue') {
      setColorStatus('assignStatusR')
    } else {
      setColorStatus('assignStatus')
    }
  }, [assignment.status]);
  // sets the table view of the assignment
return (
    <div className='assign' key={assignment.assignment_id}>
      <div className="assignName">
        <p>{assignment.name}</p>
      </div>
      <div className='forms'>
        <form className='assignform'>
          <input id={assignment.name} 
            type="text"
            name="info"
            value={inputs.info}
            onChange={e => onChange(e)}
            className="assignInput"
         />
          <button onClick={onSubmitForm} id='submitAssignment' className="Submission">Submit</button>
        </form>
      </div>
      <div className={statusColor}>
        <p>{assignment.status}</p>
      </div>
      <div className='assignDate'>
        <p>{dateSub(assignment.submission_time)}</p>
      </div>

      <div className='assignfeed'>
        <p>{assignment.feedback}</p>
      </div>

    </div>
)


};


export default Submission;
