import React from 'react'

const Dashboard = ({setAuth}) => {

    const onClick = () => {
        setAuth(false)
        setTimeout(window.location.href = '../', 3000)
    }
 return (
    <>
        <h1>Dashboard</h1>
        <button onClick={onClick}>logout</button>
    </>
 )  
}

export default Dashboard;