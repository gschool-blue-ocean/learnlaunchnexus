import { useState, useEffect } from "react"

const StudentTable = ({assignmentData, studentList,  setSelectedStudent, onStudentClick}) => { 
let Row = [];
let Table = [];
let RowID = [];

if(studentList.length > 0)
{
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
})}


    const bgColors = (item) => {
        if (item === 'Complete') {
          return 'lightgreen';
        } else if (item === 'Not Started') {
          return 'yellow';
        } else if (item === 'OverDue') {
          return 'red';
        }
    }


    return (    
    <>
    <table>
    <thead>
        <tr>
        <th>Student Name</th>
        {
        (assignmentData.length > 0) && assignmentData.map((assignment) => {
            return (
                <th>{assignment.name}</th>
            )
        })}
        </tr>
    </thead>
    <tbody>
        {(Table.length > 0) && Table.map((row, index) => {


            return (
            <tr id={RowID[index]} onClick={() => onStudentClick(RowID[index])}>
                {(row.length > 0 ) && row.map((item) => {

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

