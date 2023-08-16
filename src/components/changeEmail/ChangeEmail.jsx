import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import UpdateEmailForm from './UpdateEmailForm'


const ChangeEmail = () => {

    return (
        <>
            <h1>you can change the email yooo</h1>
            <button><UpdateEmailForm/></button>
        </>
    )
}

export default ChangeEmail