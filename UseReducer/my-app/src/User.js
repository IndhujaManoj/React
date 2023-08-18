import React, { useReducer } from 'react'

const User = () => {
    const initialValue = { name: '', userName: '', password: '' }
    const reducer = (state, action) => {
        switch (action.type) {
            case 'name':
                return { ...state, name: action.payload }
            case 'userName':
                return { ...state, userName: action.payload }
            case 'password':
                return { ...state, password: action.payload }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialValue)
    return (
        <>
            <div>
                Name:{state.name}<br /><br />
                userName:{state.userName}<br /><br />
                password:{state.password}<br /><br />
            </div>
            <input onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} defaultValue='Name' /><br /><br />
            <input onChange={(e) => dispatch({ type: 'userName', payload: e.target.value })} defaultValue='UserName' /><br /><br />
            <input onChange={(e) => dispatch({ type: 'password', payload: e.target.value })} defaultValue='Password' /><br /><br />

        </>

    )
}

export default User
