import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom'

const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("https://car-registration.onrender.com/api/getall");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`https://car-registration.onrender.com/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }


  return (
    <>
    
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add New Car</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>🚗 Car name</th>
                    <th>Manufacturing Year</th>
                    <th>💵Car Price</th>
                    <th>Total Car Avalable</th>
                    <th>Car color</th>                   
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} </td>
                            <td>{user.lname}</td>
                            <td>{user.email}/- Rupee</td>
                            <td>{user.password}</td>
                            <td>{user.color} Colour</td>                             
                            
                            <td className='actionButtons'> 
                                <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td> 
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>




           
        </table>
    </div>     

      
    </>
  )
}

export default User