import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import  { login, logout } from './Features/User'
import { useSelector } from 'react-redux'

function Login() {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')
  const user = useSelector(state => state.user.value)


  return (
    <div>
      {!user.name && (
        <div>
          <label>Name :  </label>
          <input value={name} onChange={e => setName(e.target.value)} /><br /><br />
          <label>Age :  </label>
          <input value={age} onChange={e => setAge(e.target.value)} /><br /><br />
          <label>Email :  </label>
          <input value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
        </div>
      )}

      {!user.name ?
        <button onClick={() => dispatch
          (login({ name, age, email }))}>Login</button> :
        <button onClick={() => dispatch(logout())}>Logout</button>

      }


    </div>
  )
}

export default Login
