import axios from "axios"
import React, { useState } from 'react'
import toast from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom'
import "./add.css"

const Adduser = () => {
    const users = { First_name: "", Last_name: "",Phone_number:"", Your_email: "", Password: "" }
    const navigate = useNavigate()
    const [user, setUser] = useState(users)

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/create", user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center" })
                navigate("/")
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err.message);
            });
    };



    return (
        <div className='adduser'>
            <Link to={"/"}>Back</Link>
            <h3>Add New User</h3>
            <form className='adduserform' onSubmit={submitHandler}>
                <div className="inputGroup">
                    <label htmlFor="First_name">First Name: </label>
                    <input type="text" onChange={inputHandler} id='fname' name='First_name' autoComplete='on' placeholder='Enter Your Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="Last_name">Last Name: </label>
                    <input type="text" onChange={inputHandler} id='lname' name='Last_name' autoComplete='on' placeholder='Enter Your Surname Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="Phone_number">Phone Number</label>
                    <input type="text" onChange={inputHandler} id='Phone_number' name='Phone_number' autoComplete='on' placeholder='Enter Your Phone Number' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="Your_email">email: </label>
                    <input type="email" onChange={inputHandler} id='Your_email' name='Your_email' autoComplete='on' placeholder='Forexample1234@gamil.com' />
                </div>
                <div className="inputGroup" >
                    <label htmlFor="Password">Password: </label>
                    <input type="Password" onChange={inputHandler} id='Password' name='Password' autoComplete='on' placeholder='Enter password carefully!' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Conform Your User</button>
                </div>
            </form>
        </div>
    )
}

export default Adduser

