import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router';


function Login({login}) {
    const [udetails, setUdetails] = useState({
        uname: "",
        upass: ""
    })

    // const navigates=useNavigate()

    const udetailsHandler = (event) => {
        event.preventDefault()
        const loginUser = login.find((user) => user.names === udetails.uname && user.pass === udetails.upass);
        if (loginUser) {
            alert("Login Successfully")
            // navigates('/products')
        }
        else {
            alert("Login Failed!!")
        }


        console.log(udetails,"u")
    }


    return (
        <div className='logindiv'>
            <form onSubmit={udetailsHandler} className='loginpg'>
                <h1>Login Page</h1>
                <label>Username</label>
                <input type='text' name='uname' onChange={(e) => setUdetails({ ...udetails, uname: e.target.value })} /><br/><br/>
                <label>Userpassword</label>
                <input type='pass' name='upass' onChange={(e) => setUdetails({ ...udetails, upass: e.target.value })} /><br/><br/>
                <button>submit1</button>
               
</form>
        </div>
    )
}

export default Login