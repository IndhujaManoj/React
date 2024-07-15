import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginFailure, loginSuccess } from '../slices/loginSlice'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const dispatch=useDispatch()
    const navi=useNavigate()
    const [data,setData]=useState({
        userName:'',
        password:''
    })
    const handleChange=(e)=>{
     const {name,value}=e.target
     setData({
        ...data,
        [name]:value
     })
    }
    const handleLogin=()=>{
        if(data.userName==''){
            dispatch(loginFailure('plz fill all field'))
        }else{
            dispatch(loginSuccess(data))
            navi('counter')
        }

    }
    return (
        <div>
            <input type='text' value={data.userName} name='userName' onChange={handleChange}/>
            <input type='text' value={data.password} name='password' onChange={handleChange}/>
            <button onClick={handleLogin}>submit</button>
        </div>
    )
}
