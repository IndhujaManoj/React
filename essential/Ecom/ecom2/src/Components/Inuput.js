import React from 'react'
export const Inuput = () => {
    const [value, setValue] = React.useState({
        name:'',
        password:''
    })
    const handle=()=>{
        console.log(value)
        setValue({name:'',password:''})
    }
  return (
    <>
    <input type='text' value={value.name} onChange={(e) => setValue({...value, name:e.target.value})}/>
    <input type='text' value={value.password} onChange={(e) => setValue({...value, password:e.target.value})}/>
    <button onClick={handle}>ok</button>
    </>
  )
}
