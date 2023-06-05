import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Success = () => {
    const navigate=useNavigate()
    const [count,setcount]=useState(15)
    useEffect(() => {
        setInterval(()=>
            setcount((count)=>count-1),1000)
        setTimeout(()=>navigate('/'),15000)
    }, [navigate]);

    return (
        <h5 className='mt-5'>
            Your Order has been placed successfully.you be willbe redirected in {count} seconds
        </h5>
    );
}

export default Success;
