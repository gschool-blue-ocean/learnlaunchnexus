import React, {useEffect, useState} from 'react';
import Submission from './Submission';


const Student = ({USER_ID}) => {
    const [submissionList, setSubmissionList] = useState([]);
    useEffect( () => {
        
        const getSubmissionData = async () => {
            
            
    
            try {
                console.log("Student COMP", USER_ID)
                  const res = await fetch(`${import.meta.env.VITE_API}/submission/student/${USER_ID}`, {
                    method: "GET",
                  });
          
                  const parseData = await res.json();
                  setSubmissionList(parseData)
                } catch (err) {
                  console.error(err.message);
                }
            

        }
        getSubmissionData();
    }, [USER_ID]);
    console.log(submissionList);
    return (
    <>
     {(submissionList.length > 0) && <div>
        {
        submissionList.map((assignment) => {
        return(
            <>
            <Submission assignment={assignment}></Submission>
            </>
        )
    })}
    </div>}
    </>
    )
    
}


//run fetch get list of assignments for cohort joined with submisions to get latest info
/**select user_id, assignment_id, name, submission_time,  status, feedback from (SELECT * FROM submission INNER JOIN assignment ON submission.assignment_id=assignment.id INNER JOIN tracking ON submission.tracking_id=tracking.id INNER JOIN student ON submission.student_id=student.id INNER JOIN users ON student.id=users.id WHERE users.id=1) as submission_join ; */

//for each assignment run container function to create container with assignment info


export default Student;
