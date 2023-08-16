import { Link } from 'react-router-dom'
import UpdateDesiredLocationForm from './UpdateDesiredLocationForm'


const ChangeDesiredLocation = () => {
    const USER_ID = JSON.parse(localStorage.getItem('user_id'))
    console.log(USER_ID)
    return (
        <>
            <h1>you can change the desired location yooo</h1>
            <button><UpdateDesiredLocationForm USER_ID={USER_ID} /></button>
        </>
    )
}

export default ChangeDesiredLocation