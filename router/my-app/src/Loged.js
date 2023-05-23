import React from 'react'
import LogGreeting from './LogGreeting';
import GuestGreeting from './GuestGreeting';

const Loged = (props) => {
 const isLogined = props.isLogin
  if (isLogined) {
    return <LogGreeting isLogined={true}/>
  }else{
  return <GuestGreeting/>}

}

export default Loged
