import React from 'react'
import { Name } from './name';

export const Page1 = (props) => {
    let name="indhuja";
  return (
    <Name age={props.age} name={name}/>
  )
}
