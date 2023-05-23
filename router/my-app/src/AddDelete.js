import React,{useState} from "react";
function Counter(){
    const state=useState(123)
    console.log(state)

const [count,setCount]=useState(0)
return(
    <div>
        <p>you clicked {count} times</p>
        <button onClick={()=>setCount(count+1)}>Click Me</button>
    </div>
)
}
export default Counter;