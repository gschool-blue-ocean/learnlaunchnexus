import { useState, useEffect } from "react"
import ChooseCohort from "./ChooseCohort"

const Admin = () => {
    //const [name, setName] = useState('')
    const [cohortList, setCohortList] = useState([]);
    const [currentCohort, setCurrentCohort] = useState(-1);
    const [studentList, setStudentList] = useState([]);
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
                const res = await fetch(`${import.meta.env.VITE_API}/students/cohort/${cohortList[currentCohort].id}`, {
                    method: "GET",
                  });
          
                  const parseData = await res.json();
                  setStudentList(parseData)
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
