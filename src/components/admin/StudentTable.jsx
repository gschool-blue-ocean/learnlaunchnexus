import { useState, useEffect } from "react"

const StudentTable = ({assignmentData, studentList,  setSelectedStudent, onStudentClick}) => { 
let Row = [];
let Table = [];
let RowID = [];
console.log("inTABLE", studentList, studentList.length)
if(studentList.length > 0)
{
studentList.map((student, index) => {
    console.log("inside Map", student)
    if((index % assignmentData.length) === 0)
    {
        console.log(index)
        Row.push(student.last_name + "," + student.first_name);
        RowID.push(student.user_id)
        Row.push(student.status);       
 
    }
    else if((index % assignmentData.length) === (assignmentData.length-1 ))
    {
        console.log(index)
        Row.push(student.status);
        Table.push(Row);
        Row = [];

    }
    else
    {
        console.log(index)
        Row.push(student.status);

    }
    if((assignmentData.length == 1))
    {
        Table.push(Row);
        Row = [];
    }
})}


    const bgColors = (item) => {
        if (item === 'Complete') {
          return 'rgb(111, 230, 111)';
        } else if (item === 'Not Started') {
          return 'rgb(243, 243, 90)';
        } else if (item === 'OverDue') {
          return 'rgb(235, 97, 97)';
        }
    }

console.log("row", Row, "Table", Table)
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

