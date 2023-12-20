import React, { useEffect, useState } from 'react'

export const Profile = () =>{
const [count,setCount]=useState("hi")   
useEffect(()=>{
    console.log("profile")
})
console.log("outside")

const increase=()=>{
    setCount("hello")
    console.log("increase")
}
const decrease=()=>{
    setCount(count-1)
}
   
  return (
   <>
   <div>profile</div>
   <button onClick={increase}>increase</button>
   <button onClick={decrease}>Decrease</button>
   <div>{count}</div>

   </>
  )
}
