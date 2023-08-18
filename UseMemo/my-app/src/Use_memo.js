import React, { useMemo, useState } from 'react'

export default function Use_memo() {
    const [counter,setCounter]=useState(0)
    const [person,setPerson]=useState({
        firstName:'',
        lastName:''
    })
    const [number,setNumber]=useState(1);

    const increaseFive=()=>{
        for(let i=0;i<5;i++){
            setCounter(prevState=>prevState+1)
        }
    }
    const factorialOf =(n)=>{
        console.log('inside factorialOf method')
        let result =1;
        if(n<=1){
            return result
        }else{
            for(let i=n;i>=1;i--){
                result=result*i
            }
            return result
        }
    }
    // const factorial=factorialOf(number)
     const factorial=useMemo(()=>{factorialOf(number)},[number])// usemeo pass 2 args 1.callbactfun,dependency
  return (
    <div>
      <button onClick={()=>setCounter(counter+1)}>click me</button>
      <p>Current value of counter is {counter}</p>
      <button onClick={()=>increaseFive()}>click me to add 5</button><br/>
      <input type='text' onChange={(e)=>setPerson({...person,firstName:e.target.value})} placeholder='enter your firstname'/>
            <input type='text' onChange={(e)=>setPerson({...person,lastName:e.target.value})} placeholder='entervyour last name'/>
            {/* {JSON.stringify(person)} */}
            <p>firstName :{person.firstName}</p>
            <p>lastName:{person.lastName}</p>
<hr/>
<p>Find the factorial Number</p>
<input type='text' placeholder='enter the number' onChange={(e)=>{setNumber(e.target.value)}}/>
<span>factorial of the given number is {factorial}</span>
    </div>
  )
}
