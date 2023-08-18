import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import images from './images.jpeg'


function Create() {
  
  const [getproduct, setproductDetails] = useState([{'request':'getCourses'}])
  const getValue = async () => {
    const { data } = await axios.get("http://karka.academy/api/action.php", getproduct);
    setproductDetails(data)
      }
    const navigation=useNavigate()
    function navToForm(){
      navigation('/form')
    }
    function navToLogin(){
      navigation('/login')
    }
    useEffect(() => {
      getValue()
    })
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src={images} className='w-50 h-50 rounded-circle'/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             
            </ul>
            <button type="button" class="navbar-text bg-info p-3 rounded-pill border-0" onClick={()=>navToLogin()}>Logout</button>
          </div>
        </div>
      </nav><br/>
      <button className='"btn btn-primary "' onClick={navToForm}>Create Course</button>
      <section class="h-100 gradient-form" style={{ backgroundColor: "#eee;" }}>
        <div class="container py-5 h-100">
        <h1>Product page</h1>
            <div className="row align-self-stretch m-0">
                {getproduct && getproduct.map((data, index) => {
                    return (
                        <div className="col-3 p-3">
                            <div className="card h-100">
                                <img src={data.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h6>{data.video_id}</h6>
                                    <h6>{data.request}</h6>
                                    <h5 className="card-title">{data.name}</h5>
                                    <p className="card-text">{data.description}</p>
                                    <button  className="btn btn-primary">{data.price}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </section>
    </div>
  );
}

export default Create;
