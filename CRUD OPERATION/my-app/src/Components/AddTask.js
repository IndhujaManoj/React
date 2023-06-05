import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addTaskToList } from '../Slices/TaksSlice';
import { useDispatch } from 'react-redux';
const AddTask = () => {
   const dispatch=useDispatch()
    const [name,setName]=useState('')
    const [mail,setMail]=useState('')

    const addTest=(e)=>{
        e.preventDefault()
        console.log({name,mail})
        dispatch(addTaskToList({name,mail}))
        setName('')
        setMail('')
    }
  return (
    <section className='my-5'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)}/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter mail id" value={mail} onChange={e=>setMail(e.target.value)}/>
      </Form.Group>
      <div className='text-end'>
      <Button variant="primary" type="submit" onClick={(e)=>addTest(e)}>
        Add User
      </Button>
      </div>
    </Form>
    </section>
  )
}

export default AddTask
