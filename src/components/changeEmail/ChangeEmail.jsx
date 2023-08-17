import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import UpdateEmailForm from './UpdateEmailForm'


const ChangeEmail = () => {

    return (
        <>
            <button><UpdateEmailForm/></button>
            <Link to="../dashboard">
                <button>Cancel</button>
            </Link>
        </>
    )
}

export default ChangeEmail