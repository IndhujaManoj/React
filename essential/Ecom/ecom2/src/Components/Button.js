import React from 'react';
import { Products } from './Products';

export const Button = ({ handleSizeClick }) => {
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const sizeButtonStyle = {
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    background: '#28a745',
    border: '2px solid #28a745',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, color 0.3s ease',
    margin: '0 5px',
  };

  return (
    <div style={buttonContainerStyle}>
      <button style={sizeButtonStyle} onClick={() => handleSizeClick("S")}>Small (S)</button>
      <button style={sizeButtonStyle} onClick={() => handleSizeClick("SM")}>Medium (SM)</button>
      <button style={sizeButtonStyle} onClick={() => handleSizeClick("XL")}>Extra Large (XL)</button>
    </div>
  );
};
