import React, { useState } from 'react'
import './input.css'

function Input({detailsHandler}) {
    //const [detail,setDetail]=useState([])
    const [name,setName]=useState('')
    const [pass,setPass]=useState('')
    
    const InputHandler=(event)=>{
        setName(event.target.value)
    }

    const PassHandler=(event)=>{
        setPass(event.target.value)
    }

    const submitHandler=(event)=>{
        event.preventDefault()
        // setDetail({name:name,password:pass})
        detailsHandler({name:name,password:pass})
                
        
    }
    return (
        <div className='inputdiv'>
            
            <form onSubmit={submitHandler} className='myform'>
                <h1>Registation Form</h1>
            <lable>Name :</lable>
        <input type='text' value={name} onChange={InputHandler}/><br/><br/>
        <label>Password</label>
        <input type='text' value={pass} onChange={PassHandler}/><br/><br/>
        <button>Submit</button>
        </form>
        </div>
    )
}

export default Input
