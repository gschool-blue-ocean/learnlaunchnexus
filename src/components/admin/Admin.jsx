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
  const [statusList, setStatusList] = useState([]);

  const handleStudentClick = (student) => {
    console.log("in on click", student)
    setSelectedStudent(student);
  };


  // this goes to Admin
  useEffect(() => {

    const getCohortData = async () => {

      try {
        const Cohortres = await fetch(`${import.meta.env.VITE_API}/cohort`, {
          method: "GET",
        });

        const parseCohortData = await Cohortres.json();
        setCohortList(parseCohortData)
        console.log("cohortData", parseCohortData)

        const Statusres = await fetch(`${import.meta.env.VITE_API}/tracking`, {
          method: "GET",
        });

        const parseStatusData = await Statusres.json();
        setStatusList(parseStatusData)
        console.log("parseStatusData", parseStatusData)


      } catch (err) {
        console.error(err.message);
      }

    }
    getCohortData();
  }, []);

  // this should execute this moves to admin
  useEffect(() => {

    const getCohortStudents = async () => {

      try {
        const resCohort = await fetch(`${import.meta.env.VITE_API}/cohort/${cohortList[currentCohort].id}/assignments`, {
          method: "GET",
        });

        const parseCohortData = await resCohort.json();
        setStudentList(parseCohortData);
        console.log("cohortData", parseCohortData)


        const resAssignment = await fetch(`${import.meta.env.VITE_API}/cohort_assignment/cohort/${cohortList[currentCohort].id}`, {
          method: "GET"
        });
        const parseAssignmentData = await resAssignment.json();
        setAssignmentData(parseAssignmentData)
        console.log("parseAssignmentData", parseAssignmentData)

        const response = await fetch(`${import.meta.env.VITE_API}/students/byCohort/${cohortList[currentCohort].id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setStudents(data);
        console.log("data", data)
      } catch (err) {
        console.error(err.message);
      }

    }
    getCohortStudents();
  }, [currentCohort]);



  return (
    <div>
      <ChooseCohort cohortList={cohortList} setCurrentCohort={setCurrentCohort} resetSelectedStudent={setSelectedStudent} />
      {selectedStudent ? (
        <StudentView statusList={statusList} students={students} studentID={selectedStudent} onBack={() => setSelectedStudent(null)} onStudentClick={handleStudentClick} />
      ) : (
        <StudentTable assignmentData={assignmentData} studentList={studentList} onStudentClick={handleStudentClick} />
      )}


    </div>

  );

};

export default Admin

