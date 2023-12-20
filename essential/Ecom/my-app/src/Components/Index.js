import React from 'react'
import ProductList from './ ProductList '
import data from "../service/data.json"
export const Index = () => {
  return (
    <div>
            <ProductList products={data.data} />
    </div>
  )
}
