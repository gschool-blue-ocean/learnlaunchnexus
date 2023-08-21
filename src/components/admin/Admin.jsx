import React, { useEffect, useState } from 'react';
import StudentTable from './StudentTable';
import StudentView from './StudentView';
import ChooseCohort from './ChooseCohort'
import './admin.css';

const Admin = () => {

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [cohortList, setCohortList] = useState([]);
    const [currentCohort, setCurrentCohort] = useState('')
    const [assignmentData, setAssignmentData] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [students, setStudents] = useState([]);

    const handleStudentClick = (student) => {
        console.log("in on click", student)
        setSelectedStudent(student);
     };
    
     
      // this goes to Admin
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

 // this should execute this moves to admin
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

                  console.log("Getting the student list from: " + `${import.meta.env.VITE_API}/students/byCohort/${cohortList[currentCohort].id}` )
                  const resStudentsInCohort = await fetch(`${import.meta.env.VITE_API}/students/byCohort/${cohortList[currentCohort].id}`, {
                    method: 'GET',
                });
                const studentsInCohortData = await resStudentsInCohort.json();
                setStudents(studentsInCohortData);
                
                } catch (err) {
                  console.error(err.message);
                }

        }
        getCohortStudents();
    }, [currentCohort]);

    return (
        <div>
              <ChooseCohort cohortList={cohortList} setCurrentCohort={setCurrentCohort}/>
            {selectedStudent ? (
                <StudentView students={students} studentID={selectedStudent} onBack={() => setSelectedStudent(null)}  onStudentClick={handleStudentClick}  />
            ) : ( 
                <StudentTable assignmentData={assignmentData} studentList={studentList}  onStudentClick={handleStudentClick}/>
           )}

             
        </div>

    );

};

export default Admin    

