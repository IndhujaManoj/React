import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './Redux/Splices/User'

function Login() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const user = useSelector(state => state.user.value)
    const handleSubmit = () => {
        if (user.name === '' && user.age === '') {
            dispatch(login({ name, age }))
        } else {
            dispatch(logout())
            setName('');
            setAge(0)
        }
    }
    return (
        <div>
            <label>Name : </label>
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
            <label>Age : </label>
            <input type='number' value={age} onChange={e => setAge(e.target.value)} />
            <button onClick={handleSubmit}>
                {user.name === '' && user.age === '' ? 'Login' : 'Logout'}
            </button>
        </div>
    )
}

export default Login
