import React from 'react'
import { useSelector } from 'react-redux'

export const Head = () => {

    const count=useSelector((state)=>state.counter.value)
  return (
    <div>{count}</div>
  )
}
