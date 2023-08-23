import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addAssingment = () => {
    

    const [inputs, setInputs] = useState({
        name: "" //text
    })
    
    /*
   router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query("INSERT INTO assignment (name) VALUES ($1) RETURNING *", [name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err.message);
    }
});*/

const onSubmitForm = async (e) => {
    console.log('inside onSubmitForm')
    e.preventDefault();
    const {  name } = inputs
    const body = { name}
    try {
          const res = await fetch(`${import.meta.env.VITE_API}/assignment`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(body)

          });
          const parseData = await res.json();
          toast.success(`added an Assignment`)
        } catch (err) {
          console.error(err.message);
          toast.error(`Failed to add an Assignment`)
        }
    }

const onChange = (e) => {
setInputs({ [e.target.name]: e.target.value })
}
return (
<>
    <ToastContainer />
    <form>
     <h1> Add an Assignment</h1>
    <input id="name"
              type="text"
              name="name"
              value={inputs.name}
              onChange={e => onChange(e)}
              className="undefined"
            />
    
    <button onClick={onSubmitForm} id='submitAdmin' className="Submission">Submit</button>
    </form>
</>
)
}
export default addAssingment;
