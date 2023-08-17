import { Link } from 'react-router-dom'
import UpdateLocationForm from './UpdateLocationForm.jsx'


const ChangeLocation = () => {
    const USER_ID = JSON.parse(localStorage.getItem('user_id'))
    console.log(USER_ID)
    return (
        <>
            <h1>you can change the location yooo</h1>
            <button><UpdateLocationForm USER_ID={USER_ID} /></button>
        </>
    )
}

export default ChangeLocation