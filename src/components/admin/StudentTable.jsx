import { useState, useEffect } from "react"

const StudentTable = ({assignmentData, studentList,  setSelectedStudent, onStudentClick}) => { 
let Row = [];
let Table = [];
let RowID = [];


studentList.map((student, index) => {
    if((index % assignmentData.length) === 0)
    {
        Row.push(student.last_name + "," + student.first_name);
        RowID.push(student.user_id)
        Row.push(student.status);       
 
    }
    else if((index % assignmentData.length) === (assignmentData.length-1 ))
    {
        Row.push(student.status);
        Table.push(Row);
        Row = [];

    }
    else
    {
        Row.push(student.status);

    }
})


    const bgColors = (item) => {
        if (item === 'Complete') {
          return 'rgb(111, 230, 111)';
        } else if (item === 'Not Started') {
          return 'rgb(243, 243, 90)';
        } else if (item === 'OverDue') {
          return 'rgb(235, 97, 97)';
        }
    }


    return (    
    <>
    <table>
    <thead>
        <tr>
        <th>Student Name</th>
        {
        assignmentData.map((assignment) => {
            return (
                <th>{assignment.name}</th>
            )
        })}
        </tr>
    </thead>
    <tbody>
        {Table.map((row, index) => {


            return (
            <tr id={RowID[index]} onClick={() => onStudentClick(RowID[index])}>
                {row.map((item) => {

                    return(

                        <td style={{ backgroundColor: `${bgColors(item)}` }}>{item} </td>


                     ) })   
            
                }
            </tr>
                
        )})}
    </tbody>
    </table>
    </>
    )
}
export default StudentTable;

