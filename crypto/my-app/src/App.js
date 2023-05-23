import { useState } from 'react';
import './App.css';
import Input from './Input';
import Welcome from './Welcome';
import Login from './Login';
function App() {
  const [namesdetail,setNamesdetail]=useState("")
 // console.log(users,"user")

  const detailsHandler=(all)=>{
    setNamesdetail(all)
  }

 

  return (
    <div className="App">
      <Input detailsHandler={detailsHandler}/>
      <Welcome display={namesdetail}/>
      <Login namesdetail={namesdetail}/>
    </div>
  );
}

export default App;
