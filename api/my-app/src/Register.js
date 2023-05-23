import React, {  useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

function Register() {
    const [RegUsers, setRegUsers] = useState({
        request: 'create_candidate',
        name: 'sdfjsf',
        email: 'dsfsdf',
        password: 'werer',
        aadhar: '56678',
        address: 'werrt',
        phone: '78890',
        city: 'mjnjv',
        area: 'ef4tt',
        pin: 'de445',
    })
    console.log(RegUsers)
    const [getRegisterUsers,setRegisterUsers]=useState([])

    // useEffect(()=>{
    //   console.log(getRegisterUsers)
    
    //   getRegister()
    // })


    // useEffect(async ()=>{
    
    //   //const data = await axios.get(`http://karka.academy/api/action.php?request=getAllMembers`)

    //   //getLoginInfo()
    // })

    const navigate=useNavigate()

    const postReginUser =  () => {
        axios.post(`http://karka.academy/api/action.php`, RegUsers)
       
       // navigate('/create')
      };

      const getRegister=async ()=>{
        const {data}= await axios.get(`http://karka.academy/api/action.php`,getRegisterUsers)
        console.log(data,"d")
      }
     
    return (
        <div>
           
<section class="h-100 bg-dark">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">
            <div class="col-xl-6 d-none d-xl-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo" class="img-fluid"
                style={{borderTopLeftRadius: ".25rem; border-bottom-left-radius: .25rem;" }}/>
            </div>
            <div class="col-xl-6">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">Student registration form</h3>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                    <label class="form-label" for="form3Example1m">Name</label>

                      <input type="text" id="form3Example1m" class="form-control form-control-lg" value={RegUsers.name} name='name' onChange={e=>setRegUsers({...RegUsers,name:e.target.value})} placeholder='Name'/>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                    <label class="form-label" for="form3Example1n">Email</label>

                      <input type="email" id="form3Example1n" class="form-control form-control-lg" value={RegUsers.email} name='email' onChange={e => setRegUsers({...RegUsers,email: e.target.value})} placeholder="Email"/>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                    <label class="form-label" for="form3Example1m1">Password</label>

                      <input type="password" id="form3Example1m1" class="form-control form-control-lg" value={RegUsers.password} name='password' onChange={e => setRegUsers({...RegUsers,password: e.target.value})} placeholder="Password"/>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                    <label class="form-label" for="form3Example1n1">Aadhar</label>

                      <input type="text" id="form3Example1n1" class="form-control form-control-lg" value={RegUsers.aadhar} name='aadhar' onChange={e => setRegUsers({...RegUsers,aadhar: e.target.value})} placeholder="Aadhar"/>
                    </div>
                  </div>
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example8">Address</label>

                  <input type="text" id="form3Example8" class="form-control form-control-lg" value={RegUsers.address} name='address' onChange={e => setRegUsers({...RegUsers,address: e.target.value})} placeholder="Address"/>
                </div>

                <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">

                  <h6 class="mb-0 me-4">Gender: </h6>

                  <div class="form-check form-check-inline mb-0 me-4">
                  <label class="form-check-label" for="femaleGender">Female</label>

                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                      value="option1" />
                  </div>

                  <div class="form-check form-check-inline mb-0 me-4">
                  <label class="form-check-label" for="maleGender">Male</label>

                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                      value="option2" />
                  </div>

                  <div class="form-check form-check-inline mb-0">
                  <label class="form-check-label" for="otherGender">Other</label>

                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                      value="option3" />
                  </div>

                </div>

                <div class="row">
                  <div class="col-md-6 mb-4">

                    <select class="select">
                      <option value="1">State</option>
                      <option value="2">TamilNadu</option>
                      <option value="3">Kerala</option>
                      <option value="4">Andhra Pradhesh</option>
                    </select>

                  </div>
                  <div class="col-md-6 mb-4">

                    <select class="select">
                      <option value="1">City</option>
                      <option value="2">Chennai</option>
                      <option value="3">Trivandram</option>
                      <option value="4">Amaravati</option>
                    </select>

                  </div>
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example9">Phone</label>

                  <input type="text" id="form3Example9" class="form-control form-control-lg"value={RegUsers.phone} name='phone' onChange={e => setRegUsers({...RegUsers,phone: e.target.value})} />
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example90">Pincode</label>

                  <input type="text" id="form3Example90" class="form-control form-control-lg" value={RegUsers.pin} name='pin' onChange={e => setRegUsers({...RegUsers,pin: e.target.value})}/>
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example99">City</label>

                  <input type="text" id="form3Example99" class="form-control form-control-lg" value={RegUsers.city} name='city' onChange={e => setRegUsers({...RegUsers,city: e.target.value})}  />
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example97">Area</label>

                  <input type="text" id="form3Example97" class="form-control form-control-lg" value={RegUsers.pin} name='pin' onChange={e => setRegUsers({...RegUsers,pin: e.target.value})} />
                </div>

                <div class="d-flex justify-content-end pt-3">
                  <button type="button" class="btn btn-warning btn-lg ms-2" onClick={postReginUser}>Submit form</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default Register
