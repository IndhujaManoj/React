import React, { useState } from 'react'

function Login() {
    const [Log,setLog]=useState(true)
    function clicked(){
        setLog(false)
       
    }
    return (
        <div>
            <button onClick={clicked}>click</button>
        </div>
    )
}

export default Login
