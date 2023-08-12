import React from 'react'

const Dashboard = ({setAuth}) => {

    const onClick = (e) => {
        setAuth(false)
        window.location.href = ''
    }
 return (
    <>
        <h1>Dashboard</h1>
        <button onClick={onClick}>logout</button>
    </>
 )  
}

export default Dashboard;