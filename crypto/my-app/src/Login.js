import React, { useState } from 'react'
import './Login.css'


function Login(props) {
    const [udetails, setUdetails] = useState({
        uname: "",
        upass: ""
    })
    // console.log("udetail",udetails.uname);



    const udetailsHandler = (event) => {
        event.preventDefault()
        //console.log(props.namesdetail,"n")

        if (props.namesdetail.name === udetails.uname) {
            alert("Login Successfully")
        }
        else {
            alert("Login Failed!!")
        }


        //   userDetails(udetails); // Corrected line
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
