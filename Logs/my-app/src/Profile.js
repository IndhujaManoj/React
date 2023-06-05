import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const user = useSelector(state => state.user)
    console.log(user, 'u')
    return (
        <div>
            <h1>Name:{user.value.name}</h1>
            <h2>Age : {user.value.age}</h2>
            <table style={{ border:'5' }}>
                <thead>
                    <th>Name</th>
                    <th>Age</th>
                </thead>
                <tbody>
                    <td>{user.value.name}</td>
                    <td>{user.value.age}</td>

                </tbody>
            </table>
        </div>
    )
}

export default Profile
