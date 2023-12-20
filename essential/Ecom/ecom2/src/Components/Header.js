import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Header = (props) => {
  const count = props.cartItems.length;
  const navigate=useNavigate()
const handleCartClick = () => {
    navigate('/cart', { state: { cartItems: props.cartItems } });
}

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#f5f5f5',
    }}>
      <h1 style={{ margin: 0 }}>Products</h1>
      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleCartClick}>
        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '2em' }} />
        {count > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
            {count}
          </span>
        )}
      </div>
    </div>
  );
};
