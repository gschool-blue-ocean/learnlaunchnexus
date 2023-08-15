import React, {useEffect, useState} from 'react';
// user_id, assignment_id, name, submission_time,  status, feedback
const Submission = ({assignment}) => {

return (
    <div key={assignment.assignment_id}>
    <h1>{assignment.name}</h1>
    <h1>{assignment.status}</h1>
    <h1>{assignment.submission_time}</h1>
    <h1>{assignment.feedback}</h1>
    </div>
)


};


export default Submission;

