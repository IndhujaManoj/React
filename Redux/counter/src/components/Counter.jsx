import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../slices/counterSlice';

export const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const {userName,password}=useSelector((state)=>state.login.users)
    console.log(userName,"kk")
    const dispatch = useDispatch();

    return (
        <div>
            <h1>{count}</h1>
            <h2>{userName}</h2>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={()=>dispatch(decrement())}>Decrement</button>
        </div>
    );
};
