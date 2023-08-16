import { useState, useEffect } from "react"
import ChooseCohort from "./ChooseCohort"

const Admin = () => {
    //const [name, setName] = useState('')
    const [cohortList, setCohortList] = useState([]);
    const [currentCohort, setCurrentCohort] = useState(-1);
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
    console.log(currentCohort)
    return(
        <>
            <ChooseCohort cohortList={cohortList} setCurrentCohort={setCurrentCohort}/>

            

             {(currentCohort > -1) && <h1>Your in Cohort {cohortList[currentCohort].name}</h1>} 



        
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
