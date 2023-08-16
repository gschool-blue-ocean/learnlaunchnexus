import { useState } from 'react';
import "./sub.css"


// user_id, assignment_id, name, submission_time,  status, feedback
const Submission = ({assignment, index}) => {
    const [inputs, setInputs] = useState({
        info : assignment.info
    })
    

    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value })
        console.log(inputs)
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
              //assignment = parseData
            } catch (err) {
              console.error(err.message);
            }
        }

  function dateSub (timestamp) {
    const date = new Date(timestamp)
    let month = date.getMonth()
    let day = date.getDate()
    let year = date.getFullYear()
    return `${month}/${day}/${year}`
  }
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
      <div className='assignStatus'>
        <p>{assignment.status}</p>
      </div>
      <div className='assignDate'>
        <p>{dateSub(assignment.submission_time)}</p>
      </div>
      {/* <p className='assignStatus'>{assignment.feedback}</p> */}
    </div>
)


};


export default Submission;
