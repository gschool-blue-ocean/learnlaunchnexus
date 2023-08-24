import { Link } from 'react-router-dom'
import UpdateDesiredLocationForm from './UpdateDesiredLocationForm'


const ChangeDesiredLocation = () => {
    const USER_ID = JSON.parse(localStorage.getItem('user_id'))
    return (
        <>
            <UpdateDesiredLocationForm USER_ID={USER_ID} />
        </>
    )
}

export default ChangeDesiredLocation