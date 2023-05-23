import React,{useState} from 'react'

const Prev = () => {
    const [count,setCount]=useState(0)

    const increase=()=>{
        for(let i=0;i<5;i++){
            setCount(prevState=>prevState+1)
        }
    }
  return (
    <div>
      <button onClick={()=>setCount(count+1)}>Click</button>
      <button onClick={()=>increase()}>inc</button>
      <p>{count}</p>
      <h3>prev</h3>
    </div>
  )
}

export default Prev
