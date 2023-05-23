import React from 'react'
import user from "../components/user.avif"
//import { _renderMatches } from 'react-router/dist/lib/hooks';
 const ContactCard=(props)=> {
    const {id,name,email}=props.contact;
    console.log(props.contact,"pc")
    console.log(name)
    return (
        <div className='item'>
            <img className='ui avatar image' src={user} alt='user'/>
        <div className='content'>
          <div className='header'>{name}</div>
          <div>{email}</div>
        </div>
        <i className='trash alternate outline icon'
        style={{color:"red", marginTop:"9px"}} 
        onClick={()=>props.clickHandler(id)}>
          <p>{id}</p>
        </i>
      </div>
    )
}

export default ContactCard
