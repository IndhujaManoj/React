import React from 'react'
import Header from '../component/Header'
import { Route, Routes } from 'react-router'
import DashBoard from './DashBoard'
import Product from '../component/Product'
import Cart from './Cart'
import Checkout from './Checkout'
import Success from './Success'
export default function Home() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<DashBoard/>}/>
        <Route  path='/product/:id' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout'>
        <Route path='' element={<Checkout/>}/>
        <Route path=':id' element={<Checkout/>}/>
        </Route>
        <Route path='/success' element={<Success/>}/>
      </Routes>
    </div>
  )
}
