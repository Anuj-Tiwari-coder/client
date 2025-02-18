import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../Add user/Add.css"
import axios from 'axios'
import toast from 'react-hot-toast'

const Updateuser = () => {
    const users = { First_name: "", Last_name: "", Phone_number: "", Your_email: "" }
    const { id } = useParams()
    const navigate= useNavigate()
    const [user, setUser] = useState(users)
    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`).then((response) => {
            setUser(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])
    const submitForm = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center" })
                navigate("/")
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err.message);
            });
    }
    return (
        <div className='adduser'>
            <Link to={"/"}>Back</Link>
            <h3>Update User</h3>
            <form className='adduserform' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="First_name">First Name: </label>
                    <input type="text" value={user.First_name} onChange={inputChangeHandler} id='fname' name='First_name' autoComplete='on' placeholder='Enter Your Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="Last_name">Last Name: </label>
                    <input type="text" value={user.Last_name} onChange={inputChangeHandler} id='lname' name='Last_name' autoComplete='on' placeholder='Enter Your Surname Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="Phone_number">Phone number: </label>
                    <input type="text" value={user.Phone_number} onChange={inputChangeHandler} id='Phone_number' name='Phone_number' autoComplete='on' placeholder='+91 123456789' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="Your_email">email: </label>
                    <input type="email" value={user.Your_email} onChange={inputChangeHandler} id='Your_email' name='Your_email' autoComplete='on' placeholder='Forexample1234@gamil.com' />
                </div>
                <div className="inputGroup">
                    <button type='submit'>Update Your User</button>
                </div>
            </form>
        </div>
    )
}

export default Updateuser