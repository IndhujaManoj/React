import React,{useState} from 'react';
import LogOut from './LogOut';
import LoginButton from './LoginButton';
import Loged from './Loged';
const UserGreeting = () => {
    const [isLogin,setLogin]=useState(false)
    function handleLogin(){
        setLogin(true)
    }
    function handleLogout(){
        setLogin(false)
    }
    let button;
    if(isLogin){
        button=<LogOut onClick={handleLogout}/>
    }else{
    button=<LoginButton onClick={handleLogin}/>}
  return (
    <div>
      <Loged isLogin={isLogin}/>
      {button}
    </div>
  )
}

export default UserGreeting
