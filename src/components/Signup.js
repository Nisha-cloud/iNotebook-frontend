import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {

    const [credentials, setCredentails] = useState({name:"", email:"", password:""})
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()

        const URL = 'https://inotebook-9s60.onrender.com/users'

        // const AuthString = 'Bearer '.concat(User_token)
        axios.post(URL, {name: credentials.name, email: credentials.email, password: credentials.password})
            .then(response => {
                // setNotes(response.data)
                console.log(response.data)
                if(response.status===201){
                    localStorage.setItem('token', response.data.token)
                    props.showAlert("Account created successfully", "success")
                    navigate("/home")
                    
                }
                else{
                    props.showAlert("Invalid Credentials", "danger")
                }
            })
            .catch((error) => {
                console.log('error ' + error)
            })
    }
    const onChange = (e) => {
        setCredentails({...credentials, [e.target.name]: e.target.value})
      
      }


    return (
        <div className='container mt-2'>
            <h2 className='my-3'>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
                        
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="password" name='cpassword' onChange={onChange} required/>
                </div>


                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
