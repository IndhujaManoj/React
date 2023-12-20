import React from 'react'

export const Button = (props) => {
    const myFunction = () => {
        console.log("hi")
    }
  return (
    <button onClick={myFunction}>{props.name}</button>
  )
}
