import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInList } from '../Slices/TaksSlice';
const Updates = (props) => {
  const { selectedTask } = useSelector((state) => state.tasks)

  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [id, setId] = useState(0)
  const dispatch=useDispatch()
  const UpdateTask = () => {
    props.onHide()
    dispatch(updateTaskInList({id,name,mail}))
  }
  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0 ){
    setName(selectedTask.name)
    setMail(selectedTask.mail)
    setId(selectedTask.id)
  }
}, [selectedTask])
return (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Update Name
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Task Title" value={name} onChange={e => setName(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Task Description" value={mail} onChange={e => setMail(e.target.value)} />
        </Form.Group>

      </Form>
    </Modal.Body>
    <Modal.Footer>
      <div className='text-end'>
        <Button variant="primary" type="submit" onClick={(e) => UpdateTask(e)}>
          Update 
        </Button>
      </div>
    </Modal.Footer>
  </Modal>
)
}

export default Updates
