import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTask,removeFromList } from '../Slices/TaksSlice';
import Updates from './Update';
const TaskList = () => {
  const [modalShow,setModalShow]=useState(false)
  const {taskList}=useSelector((state)=>state.tasks)    
  const dispatch=useDispatch()

  const Update=(task)=>{
    console.log('update')
    setModalShow(true)
    dispatch(setSelectedTask(task))
  }
  const deleteTask=(task)=>{
    console.log('delete')
    dispatch(removeFromList(task))

  }
  return (
    <>
    <Table striped bordered hover>
    <thead>
      <tr className='text-center'>
        <th>Id</th>
        <th>Name</th>
        <th>Mail id</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
         taskList.map((task,index)=>{
          return(
            <tr  className='text-center' key={task.id}>
            <td>{index+1}</td>
            <td>{task.name}</td>
            <td>{task.mail}</td>
            <td><Button variant="primary" className='mx-3' onClick={()=>Update(task)}><i className="bi bi-pencil-square"></i></Button>
             <Button variant="danger" onClick={()=>deleteTask(task)}><i className="bi bi-trash" ></i></Button></td>
          </tr>
          )
        })
      }
     
     
    </tbody>
  </Table>
   <Updates
   show={modalShow}
   onHide={() => setModalShow(false)}
 />
 </>
  )
}

export default TaskList
