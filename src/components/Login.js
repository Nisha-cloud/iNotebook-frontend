import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentails] = useState({email:"", password:""})
    let navigate = useNavigate()
    

    const handleSubmit = (e) => {
        e.preventDefault()

        // const User_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzczOWQ4N2ZmMDNmZWZkYjIyMWRlY2IiLCJpYXQiOjE2Njg2Njc1OTZ9.tiXy9BLkX-T370eiUW8X69Xyq_5mmAnfyNRfNEmXLmM'

        const URL = 'https://inotebook-9s60.onrender.com/users/login'

        // const AuthString = 'Bearer '.concat(User_token)
        axios.post(URL, {email: credentials.email, password: credentials.password})
            .then(response => {
                // setNotes(response.data)
                console.log("hjoiuhyghj", response.data)
                if(response.status===201){
                    localStorage.setItem('token', response.data.token)
                    props.showAlert("Logged in successfully", "success")
                    navigate("/home")
                    
                }
                else{
                    props.showAlert("Invalid Details", "danger")
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
        <div className='mt-2'>
            <h2 className='my-3'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value = {credentials.email} onChange ={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name ="password" value={credentials.password}  onChange ={onChange} id="password" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
