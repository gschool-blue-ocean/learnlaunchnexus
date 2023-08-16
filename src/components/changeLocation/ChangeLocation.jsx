import { Link } from 'react-router-dom'


const ChangeLocation = () => {
    return (
        <>
            <h1>you can change the location yooo</h1>
            <Link to='/dashboard'>
                <button>go back to dashboard</button>
            </Link>
        </>
    )
}

export default ChangeLocation