import { useState } from 'react';
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
        console.log('inside onSubmitForm')
        e.preventDefault();
        let currentTime = new Date(Date.now());
        currentTime = currentTime.toISOString();
        console.log(currentTime)
        console.log(assignment.submission_id)
        const body = {"info": inputs.info, "submission_time": currentTime}
        console.log(body)
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
        console.log(assignment.submission_id)
return (
    <div key={assignment.assignment_id}>
    <form>
        <h1>{assignment.name}</h1>
    <input id={assignment.name}
                      type="text"
                      name="info"
                      value={inputs.info}
                      onChange={e => onChange(e)}
                      className="undefined"
                    />
    <button onClick={onSubmitForm} id='submitAssignment' className="Submission">Submit</button>
    </form>
    <h1>{assignment.status}</h1>
    <h1>{assignment.submission_time}</h1>
    <h1>{assignment.feedback}</h1>
    </div>
)


};


export default Submission;
