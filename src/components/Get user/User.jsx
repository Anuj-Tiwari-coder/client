import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./User.css";
import toast from "react-hot-toast";

const User = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/getall")
            setUsers(response.data)
        }
        fetchData()
    }, [])
    const deleteUser = async (userId) => {
        axios.delete(`http://localhost:8000/api/delete/${userId}`).then
            (response => {
                setUsers((preUser) => preUser.filter((user) => user.id !== userId))
                toast.success(response.data.msg, { position: "top-center" })
                navigate("/")
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='userTable'>
            <Link to={"/add"} className='addButton'>Add User</Link >
            <table border={2} cellPadding={8} cellSpacing={2}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.First_name || "Na"}</td>
                                    <td>{user.Last_name || "NA"}</td>
                                    <td>{user.Phone_number || "N/A"}</td>
                                    <td>{user.Your_email || "N/A"}</td>
                                    <td className='actionButton'><button onClick={(e) => deleteUser(user._id)}><i className="fa-regular fa-trash-can"></i></button>
                                        <Link to={"/edit/" + user._id}><i className="fa-solid fa-user-pen"></i></Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User;