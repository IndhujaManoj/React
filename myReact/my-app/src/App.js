import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Products from './components/Products';
import Login from './components/Login';
import Links from './components/Links';
import Register from './components/Register';
import './App.css'
import { useState } from 'react';
import Purchase from './components/Purchase';

function App() {
  const [registers,setRegisters]=useState('')
  const [cartList,setCartlist]=useState([])
  console.log(registers,"cl")

  const register=(all)=>{
    setRegisters((prevRegister)=>[...prevRegister,all])
}
const cartLists = (items) => {
  setCartlist((prevCartList) => [...prevCartList, items]); // Add the new items to the previous cartList state
};

const deleteItems=(index)=>{
  setCartlist((prevCartList)=>{
    const updatedCartList=[...prevCartList];
   updatedCartList.splice(index,1);
    return updatedCartList
  })
}

  return (
    <div>
      <BrowserRouter>
      <div>
      <div className='navBar'>

      <nav >
        <Link to='/home' className='links'>Home</Link>
          <Link to='/register' className='links' >Register</Link>
          <Link to='/login' className='links'>Login</Link>

          <Link to="/about" className='links'>About</Link>
          <Link to="/products" className='links'>Products</Link>
          
                </nav><Outlet /></div>
      </div>
        <Routes>
          <Route path='/' element={<Links />} />
          <Route path='/home' element={<Links/>}/>
          <Route path='register' element={<Register registerDetails={register}/>} />
          <Route path='login' element={<Login login={registers}/>} />

          <Route path='about' element={<About />} />
            <Route path='products' element={<Products carts={cartLists}/>} />
            <Route path='/purchase' element={<Purchase purchase={cartList} deleteItems={deleteItems}/>}/>

          <Route
            path='*' element={
              <p>There is nothing</p>
            }></Route>
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
