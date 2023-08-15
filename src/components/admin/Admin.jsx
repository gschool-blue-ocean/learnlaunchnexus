// const Admin = () => {
//     const [name, setName] = useState('')
//     async function getName() {
//     try {
//     const response = await fetch('http://localhost:3001/api/admin/', {
//     method: 'GET',
//     headers: {
//     token: localStorage.token
//     }
//     })
//     const data = await response.json()
//     setName(data.user_name)
//     } catch (error) {
//     console.error(error.message)
//     }
//     }
//     useEffect(() => {
//     getName()
//     })
//     return(
//     <h1>Admin page for {name}</h1>
//     )
//     }

const Admin = () => {
    return (
        <>
        <h1>I am an admin</h1>
        </>
    );
}

export default Admin; 
