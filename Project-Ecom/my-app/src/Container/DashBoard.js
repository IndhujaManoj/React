import React from 'react'
import { ProductList } from '../data/ProductList'
import ProducrCart from '../component/ProducrCart'

export default function DashBoard() {
  return (
    <div className='d-flex flex-wrap justify-content-center p-3'>
        {ProductList.map((product)=><ProducrCart {...product} key={product.id}/>)}
    </div>
  )
}
