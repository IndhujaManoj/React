import axios from 'axios'
import React, { useState } from 'react'


function Create_user() {
    const [users, setUsers] = useState({
        request:"create_course",
        name: '',
        video_id: '',
        description: '',
        price: ''
    })
     
      const postUser = async () => {
        const res = await axios.post(`http://karka.academy/api/action.php/`, users,{
          headers : {
            Accept: "application/json, text/plain, */*",
            'Content-Type' : "Application/json",
          }
        }).then((response) => (res = response))
        console.log(res)
      };
    
  return (
    <div>
    <input type="text" value={users.name} name='name' onChange={e => setUsers({...users,name: e.target.value})} placeholder="Name" />
    <input type="text" value={users.video_id} name='video_id' onChange={e => setUsers({...users,video_id:e.target.value})} placeholder="Video ID" />
    <input type="text" value={users.description} name='description' onChange={e => setUsers({...users,description:e.target.value})} placeholder="Description" />
    <input type="text" value={users.price} name='price' onChange={e => setUsers({...users,price:e.target.value})} placeholder="Price" />
    <button type='button' onClick={()=>postUser()}>Post</button>
  </div>
  )
}

export default Create_user
