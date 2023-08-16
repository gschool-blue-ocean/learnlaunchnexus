import { Link } from 'react-router-dom'


const ChangeDesiredLocation = () => {
    return (
        <>
            <h1>you can change the desired location yooo</h1>
            <Link to='/dashboard'>
                <button>go back to dashboard</button>
            </Link>
        </>
    )
}

export default ChangeDesiredLocation