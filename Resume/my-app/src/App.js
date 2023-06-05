
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Resume from './Resume';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import View from './View';
import { useState } from 'react';
import Login from './Login';
function App() {
  const [values,setValues]=useState([])
  const [logs,setLogs]=useState([])
  console.log(logs,"v")
  const updateValues = (details) => {
    setValues((prevList) => [...prevList, details]); // Add the new items to the previous cartList state
  };

  const register=(log)=>{
      setLogs((prevRegList)=>[...prevRegList,log])
  }
  const deleteItems=(index)=>{
    setValues((prevList)=>{
      const updatedList=[...prevList];
     updatedList.splice(index,1);
      return updatedList
    })
  }
  return (

    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login reg={register}/>} />
        <Route path='/resume' element={<Resume updateValues={updateValues} logInfo={logs}/>} />
        <Route path='/view' element={<View Viewinfo={values} deleteItems={deleteItems}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
