import React from "react";
/*function Demo(){
    return(
        <div>
            <button onClick={()=>{alert('welcome')}}>Click</button>
        </div>
    )
}*/
var x=10
function pluss(){
    x++
    alert(x)
}
function Demo(){
    return(
        <div>
            <button onClick={pluss}>ADD</button>
        </div>
    )
}
export default Demo;