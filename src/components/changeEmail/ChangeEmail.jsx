import { Link } from 'react-router-dom'


const ChangeEmail = () => {
    return (
        <>
            <h1>you can change the email yooo</h1>
            <Link to='/dashboard'>
                <button>go back to dashboard</button>
            </Link>
        </>
    )
}

export default ChangeEmail