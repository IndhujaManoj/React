import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// import './Login.css'
function Login() {
    const [Login,setLogin]=useState({
        request : 'candidate_login',
        email : '',
        password : ''
    })
    const [getLogin,setGetLogin]=useState([])

    useEffect(async ()=>{
        console.log(getLogin)
      
        const data = await axios.post(`http://karka.academy/api/action.php`, {request: "getAllMembers"
      })

        //getLoginInfo()
      })

    const LoginUser = async () => {
        const data = await axios.post(`http://karka.academy/api/action.php`, Login)
        console.log(data,"....")
      };

      const getLoginInfo=async ()=>{
        const {data}= await axios.get(`http://karka.academy/api/action.php`,getLogin)
        console.log(data,"d")
      }
    return (
        <div>
            <div className='logininput'>
                
<section class="vh-100" style={{backgroundColor: '#9A616D'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: '1rem'}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" style={{borderRradius: '1rem 0 0 1rem' }}/>
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                    {/* <span class="h1 fw-bold mb-0">Logo</span> */}
                  </div>

                  <h1 class="fw-normal mb-3 pb-3" style={{letterSpacing: "1px;"}}>Sign into your account</h1>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" value={Login.email} name='email' onChange={e=>setLogin({...Login,email:e.target.value})} placeholder='Email'/>
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" value={Login.password} name='login' onChange={e => setLogin({...Login,password: e.target.value})} placeholder="Password"/>
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="button" >Login</button>
                  </div>

                  
                  <p class="mb-5 pb-lg-2" style={{color:' #393f81'}}>Don't have an account? <a style={{textDecoration:'underline'}}><Link to='/register'>Register</Link></a> </p>


                 
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
        </div>
    )
}

export default Login
