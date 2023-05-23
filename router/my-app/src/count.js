import React, {useState} from 'react'

const Counters = () => {
    const [count,setCount]=useState(0)
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>Click</button>
      <p>You have clicked {count} times</p>
    </div>
  )
}

export default Counters
