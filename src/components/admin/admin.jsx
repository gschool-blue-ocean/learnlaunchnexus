import { useState } from "react"
import chooseCohort from "./ChooseCohort"

const Admin = () => {
    //const [name, setName] = useState('')
    const [cohorts, setCohorts] = useState([])
    const [currentcohort, setCurrrentCohort] = useState('')
    async function getCohorts() {
    try {
    const response = await fetch(`${import.meta.env.VITE_API}/cohort/`, {
    method: 'GET',
    })
    const data = await response.json()
    setCohorts(data)
    } catch (error) {
    console.error(error.message)
    }
    }
    getCohorts()
    // useEffect(() => {
    // getName()
    // })
    return(
        <>
            {/* {!currentcohort (
                //map through cohorts and get each name and 
                //put it into a a dropdown menu was the idea
                <div>
                    <chooseCohort />
                </div>
            )}  */}



        
            {/* <h1>Admin page for {name}</h1>
            <h1>Choose Cohort</h1>
            <form>
                <input></input>
                <button type="submit">Cohort</button>
            </form> */}
        </>
    )
}

// const Admin = () => {
//     return (
//         <>
//         <h1>I am an admin</h1>
//         </>
//     );
// }

export default Admin; 
