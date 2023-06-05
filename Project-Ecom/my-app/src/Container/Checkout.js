import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductListItem from '../component/ProductListItem';
import { modifyItem, removeItem } from '../Reducer/Cart';
import { useNavigate, useParams } from 'react-router';
import { ProductList } from '../data/ProductList';

const Checkout = () => {
  const params = useParams();
  const cartList = useSelector((state) => state.cart.list);
  const [state, setState] = useState(
    params.id
      ? [
          {
            ...ProductList.find((element) => element.id === parseInt(params.id)),
            count: 1,
          },
        ]
      : cartList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incrementItem = (item) => {
    const index=state.findIndex(
      (product)=>product.id===item.id
    )
   // dispatch(modifyItem({ ...item, count: item.count + 1 }));
    setState((state)=>[
      ...state.slice(0,index),
      {...item,count:item.count+1},
      ...state.slice(index+1)

    ])
  };

  const decrementItem = (item) => {
    if (item.count === 1) {
      dispatch(removeItemFromCart(item));
    } else {
      // dispatch(modifyItem({ ...item, count: item.count - 1 }));
      const index=state.findIndex(
        (product)=>product.id===item.id
      )
     // dispatch(modifyItem({ ...item, count: item.count + 1 }));
      setState((state)=>[
        ...state.slice(0,index),
        {...item,count:item.count-1},
        ...state.slice(index+1)
  
      ])
    }
  };

  const removeItemFromCart = (item) => {
    // dispatch(removeItem(item));
    const index=state.findIndex(
      (product)=>product.id===item.id
    )
   // dispatch(modifyItem({ ...item, count: item.count + 1 }));
    setState((state)=>[
      ...state.slice(0,index),
      ...state.slice(index+1)

    ])
  };

  return (
    <>
      {state.length > 0 ? (
        <>
          {state.map((item) => (
            <ProductListItem
              {...item}
              key={item.id}
              incrementItem={() => incrementItem(item)}
              decrementItem={() => decrementItem(item)}
              removeItem={() => removeItemFromCart(item)}
            />
          ))}
          <button className='btn btn-success' onClick={() => navigate('/success')}>
            Place Order
          </button>
        </>
      ) : (
        <h3>No Items In The Checkout</h3>
      )}
    </>
  );
};

export default Checkout;
