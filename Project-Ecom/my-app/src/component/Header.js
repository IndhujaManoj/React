import React from 'react'
import { useNavigate } from 'react-router'

export default function Header() {
    const Navigate=useNavigate()
    return (
        <div className='p-3 bg-secondary'>
            <h3>My Hub</h3>
            <div className='row justify-content-center pt-2 pb-1'>
                <div className='col-sm-12 col-md-7 col-lg-6 col-xl-5 d-flex'>
                    <button className='btn btn-success me-4' onClick={()=>Navigate('/')}>Home</button>
                    <input className='form-control'
                        type='search'
                        placeholder='search...' />
                    <button className='btn btn-success ms-3' onClick={()=>Navigate('/cart')}>Cart</button>

                </div>
            </div>
        </div>
    )
}
