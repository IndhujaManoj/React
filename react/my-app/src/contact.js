import React from "react";
import './contact.css';

function Contact(props){
   var nm=props.name.toUpperCase()
    return(
        <div className="test" style={{color:"red"}}>
            <p>{props.id[1]}</p>
            <h2>Contact For {nm}</h2>
            <label>EMAIL Address:</label>
            <input type="text"/>
            <br/><br/>

            <label>Message</label>
            <textarea></textarea>
            <button >Send</button>

        </div>
    )
}

export default Contact;