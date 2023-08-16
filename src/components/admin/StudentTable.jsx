import { useState } from "react"

const StudentTable = ({assignmentData, studentList}) => { 
let Row = [];
let Table = [];


studentList.map((student, index) => {

    if((index % assignmentData.length) === 0)
    {
        Row.push(student.last_name + "," + student.first_name);
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
        {Table.map((row) => {


            return (
            <tr>
                {row.map((item) => {

                    return(

                        <td>{item}</td>


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

