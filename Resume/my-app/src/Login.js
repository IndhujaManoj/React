import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router';
function Login({reg}) {
    let navi = useNavigate()
    const [Logins,setLogins]=useState([{
        user:'',
        pass:''
    }])
    const submitHandle=(e)=>{
        e.preventDefault()
        setLogins({...Logins,user:'',pass:''})
        reg(Logins)
        navi('/resume')
    }
   
    return (
        <div>

            <form className='inputslog' onSubmit={submitHandle}>

                <div className='align'>
                    <h2>Login</h2>
                    <div className='name'>
                        <label>User:</label>
                        <input type='text' onChange={(e)=>setLogins({...Logins,user:e.target.value})}/>
                    </div>

                    <div className='pass'>
                        <label>Password:</label>
                        <input type='text' onChange={(e)=>setLogins({...Logins,pass:e.target.value})}/>
                    </div>

                    <div className='ok'>
                        <button>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
