import { Link } from 'react-router-dom'
import UpdateLocationForm from './UpdateLocationForm.jsx'


const ChangeLocation = () => {
    const USER_ID = JSON.parse(localStorage.getItem('user_id'))
    return (
        <>
            <button><UpdateLocationForm USER_ID={USER_ID} /></button>
        </>
    )
}

export default ChangeLocation