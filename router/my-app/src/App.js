import React from 'react'
import './App.css';

function App() {
  function handleClick(){
    console.log("i am working")
}

let myEvent=()=>console.log("i am working from arrow function")
    return(
        <div className=""app> 
        <button onClick={handleClick}>Login</button>
        <button onClick={myEvent}>Arrow Event</button>
        </div>
    )
}

export default App;
