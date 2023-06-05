import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {changeColor} from './Features/Theme'
function Color() {
    const [color,setColor]=useState('black')
    const dispatch=useDispatch()
  return (
    <div>
      
      <input type='color' value={color} onChange={e=>setColor(e.target.value)}/>
   <button onClick={()=>dispatch(changeColor(color))}>Change color</button>
    </div>
  )
}

export default Color
