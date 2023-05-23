import React,{useState} from 'react'

 
const StateChange = () => {
    const [name,setName]=useState("")
    const [show,setShow]=useState()
    const bg=true;
    function handleSubmit(){

    }
    function changing(e){
       setName(e.target.value)
    }
   function handleSubmit(e){
    if(name==""){
        alert('plz enter name')
    }
else{
        setShow(name)
        e.preventDefault()
        setName('')}
        
    }
        
    
    
  return (
    <div>
      <form onSubmit={handleSubmit} style={{color:"red"}}> 
        <input type='text' onChange={changing} value={name}/>
        <button type='submit'>OK</button>
        <h3>{show}</h3>
      </form>
    </div>
  )
}

export default StateChange
