import React from "react";

function Myform(){
    return(
        <div>
            <label>Name :</label>
            <input type="text"/><br/><br/>
            <label>Phone:</label>
            <input type="text"/><br/><br/>
            <label>Age:</label>
            <input type="number"/><br/><br/>
            <button onClick={Button}>Submit</button>


        </div>
    )
}
function Button(){
    {alert('form submit successfully')}
}
export default Myform;