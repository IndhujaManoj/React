import React from 'react'


function Welcome(props) {
    console.log(props.display.name,"p")
    return (
        <div style={{display:"none"}}>
        <p>Welcome {props.display.name}</p>
        </div>
    )
}

export default Welcome
