import React, { useEffect, useRef } from 'react'

export default function Style() {
    const colorPara=useRef(null)//colorPara={current:null}
    const colors=['red','blue','green','yellow','pink','skyblue']
    useEffect(()=>{
        console.log(colorPara)
        console.log(colorPara.current,"c")

    })
    const  stylePara=()=>{
        const randomColor=Math.floor(Math.random()*colors.length)
        colorPara.current.style.color=colors[randomColor];
    }
  return (
    <div>
      <button onClick={()=>{stylePara()}}>Click me</button>
      <p ref={colorPara}>welcome to karka</p>  {/* colorpara={current:p} */}

    </div>
  )
}
