import React, {useEffect, useState} from 'react';
// user_id, assignment_id, name, submission_time,  status, feedback
const Submission = ({assignment}) => {
    const [inputs, setInputs] = useState({
        info : assignment.info
    })


    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs)
    }

    const onSubmitForm = async (e) => {
        console.log('inside onSubmitForm')
        e.preventDefault();
        let currentTime = now()
        const body = {info: inputs, submission_time: currentTime}
        console.log(body)
        try {
              const res = await fetch(`${import.meta.env.VITE_API}${assignment.id}`, {
                method: "PATCH",
                body: JSON.stringify(body)

              });
              const parseData = await res.json();
              //assignment = parseData
            } catch (err) {
              console.error(err.message);
            }
        }
return (
    <div key={assignment.assignment_id}>
    <form>
        <h1>{assignment.name}</h1>
    <input id={assignment.assignment_id}
                      type="text"
                      name="info"
                      value={inputs.info}
                      onChange={e => onChange(e)}
                      className="undefined"
                    />
    </form>
    <h1>{assignment.status}</h1>
    <h1>{assignment.submission_time}</h1>
    <h1>{assignment.feedback}</h1>
    </div>
)


};


export default Submission;

