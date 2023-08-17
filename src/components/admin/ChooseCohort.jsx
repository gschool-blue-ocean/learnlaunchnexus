import {useState, useEffect} from 'react';

const ChooseCohort = ({cohortList, setCurrentCohort}) => {

 
    // on selection setCurrentCohort  for Admin to use.
    const handleChange = (e) =>
    {
        e.preventDefault();
        console.log("Inside on change, setting currentCohort to: " + e.currentTarget.value);
        setCurrentCohort(e.currentTarget.value);
    }
    

    return (
        <>
        <label htmlFor="cohort-select">Select Cohort</label>
        <select name="cohort-dropdown" id="cohort-select" onChange={e => handleChange(e)}>
        <option value="">Select a Cohort</option>

        {/* <option value='0'>TTFN-1</option> 
        <option value='1'>TTFN-2</option> */}
       {cohortList.map((cohort, index) => {
         {console.log(JSON.stringify(cohort));}   
        return (
            
            <option key={index} value={index}>{cohort.name}</option>
        
        )})};
        </select>
        </>
    )

}

export default ChooseCohort;