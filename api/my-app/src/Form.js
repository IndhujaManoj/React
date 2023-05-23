import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
function Form() {
    const [users, setUsers] = useState({
        request: "create_course",
        name: '',
        video_id: '',
        description: '',
        price: ''
      });
      const postUser = async () => {
        const res = await axios.post(`http://karka.academy/api/action.php`, users)
        console.log(res)
      };
      const navigation=useNavigate()
      
      function navToLogin(){
        navigation('/login')
      }
    
    return (
        <div>
            
      <section class="h-100 gradient-form" style={{ backgroundColor: "#eee;" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
              <div class="card rounded-3 text-black">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="card-body p-md-5 mx-md-4">

                      <div class="text-center">
                      
                        <h1 class="mt-1 mb-5 pb-1">Create your courses</h1>
                      </div>

            <form>
                        {/* <h3 className='mt-1 mb-5 pb-1'>Create your Course</h3><br/> */}

                        <div class="form-outline mb-4">
                          <label class="form-label" for="form2Example11">Username</label>

                          <input type="text" id="form2Example11" class="form-control" value={users.name} name='name' onChange={e => setUsers({ ...users, name: e.target.value })}
                            placeholder="Name" />
                        </div>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="form2Example22">VideoId</label>

                          <input type="text" id="form2Example22" class="form-control" value={users.video_id} name='video_id' onChange={e => setUsers({ ...users, video_id: e.target.value })}
                            placeholder='VideoId' />
                        </div>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="form2Example22">Description</label>

                          <input type="text" id="form2Example22" class="form-control" value={users.description} name='description' onChange={e => setUsers({ ...users, description: e.target.value })}
                            placeholder='Description' />
                        </div>

                        <div class="form-outline mb-4">
                          <label class="form-label" for="form2Example22">Price</label>

                          <input type="text" id="form2Example22" class="form-control" value={users.price} name='description' onChange={e => setUsers({ ...users, price: e.target.value })}
                            placeholder='Price' />
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={() => postUser()}>Post</button>
                        </div>

                      </form>
                      </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 class="mb-4">We are more than just a company</h4>
                      <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

export default Form
