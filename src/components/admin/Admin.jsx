import { useState, useEffect } from "react"
import ChooseCohort from "./ChooseCohort"
import StudentTable from "./StudentTable";
// fetch assignment list by cohort id
// fetch all students name by user_id
// create table left = student name , top = assignment name
// populate table with student tracking data
// on student selection pull up single student view
// use submision logic for feedback data in single student view
const Admin = () => {
    //const [name, setName] = useState('')
    const [cohortList, setCohortList] = useState([]);
    const [currentCohort, setCurrentCohort] = useState(-1);
    const [studentList, setStudentList] = useState([]);
    const [assignmentData, setAssignmentData] = useState([]);

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
                        

    console.log(currentCohort)
    return(
        <>
            <ChooseCohort cohortList={cohortList} setCurrentCohort={setCurrentCohort}/>
            <StudentTable assignmentData={assignmentData} studentList={studentList}/>
            

             {(currentCohort > -1) && <h1>You are in Cohort {cohortList[currentCohort].name}</h1>} 
             {(studentList.length > 0) && <h1>Your first student's ID {studentList[0].user_id}</h1>} 


        
            {/* <h1>Admin page for {name}</h1>
            <h1>Choose Cohort</h1>
            <form>
                <input></input>
                <button type="submit">Cohort</button>
            </form> */}
        </>
    )
}


export default Admin; 
