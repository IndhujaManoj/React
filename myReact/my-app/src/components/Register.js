import React, { useState } from 'react'
import './Reg.css'
import { useNavigate } from 'react-router'
function Register({registerDetails}) {

    const [detail,setDetail]=useState({
        name:"",
        password:""
    })
   
    const navigate=useNavigate()                                        
    const submitHandler = (event) => {
        event.preventDefault()
         registerDetails({names:detail.name,pass:detail.password})
        console.log(detail.name,"d")
        navigate('/login')


    }
    return (
        <div className='inputdiv'>

            <form onSubmit={submitHandler} className='myform'>
                <h1>Registation Form</h1>
                <lable>Name :</lable>
                <input type='text' name='name' onChange={(e)=>setDetail({...detail,name:e.target.value})} /><br /><br />
                <label>Password</label>
                <input type='text' name='password' onChange={(e)=>setDetail({...detail,password:e.target.value})} /><br /><br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register
