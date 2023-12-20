import React from 'react';

const SizeFilter = ({ handleSizeClick }) => {
  return (
    <div>
      <button onClick={() => handleSizeClick('XL')} 
      style={{
        backgroundColor: '#4CAF50', 
        border: 'none', 
        color: 'white', 
        padding: '10px 20px',
        textAlign: 'center', 
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px', 
        borderRadius: '20px',
        margin: '5px', 
        cursor: 'pointer',
      }}
      >XL</button>
       <button
        onClick={() => handleSizeClick('XL')}
        style={{
          backgroundColor: '#4CAF50', 
          border: 'none',
          color: 'white', 
          padding: '10px 20px', 
          textAlign: 'center', 
          textDecoration: 'none', 
          display: 'inline-block', 
          fontSize: '16px', 
          borderRadius: '20px', 
          margin: '5px',
          cursor: 'pointer',
        }}
      >
        XL
      </button>
      <button onClick={() => handleSizeClick('S')} 
      style={{
        backgroundColor: '#4CAF50', 
        border: 'none', 
        color: 'white', 
        padding: '10px 20px', 
        textAlign: 'center',
        textDecoration: 'none', 
        display: 'inline-block', 
        fontSize: '16px', 
        borderRadius: '20px', 
        margin: '5px', 
        cursor: 'pointer',
      }}>S</button>
      <button onClick={() => handleSizeClick('XXL')}
      style={{
        backgroundColor: '#4CAF50',
        border: 'none', 
        color: 'white', 
        padding: '10px 20px', 
        textAlign: 'center', 
        textDecoration: 'none', 
        display: 'inline-block', 
        fontSize: '16px', 
        borderRadius: '20px', 
        margin: '5px', 
        cursor: 'pointer',
      }}>XXL</button>
      <button onClick={() => handleSizeClick('SM')}
      style={{
        backgroundColor: '#4CAF50', 
        border: 'none', 
        color: 'white', 
        padding: '10px 20px', 
        textAlign: 'center', 
        textDecoration: 'none',
        display: 'inline-block', 
        fontSize: '16px', 
        borderRadius: '20px', 
        margin: '5px', 
        cursor: 'pointer',
      }}>SM</button>
      <button onClick={() => handleSizeClick('XXXL')}
      style={{
        backgroundColor: '#4CAF50', 
        border: 'none', 
        color: 'white', 
        padding: '10px 20px', 
        textAlign: 'center', 
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px', 
        borderRadius: '20px',
        margin: '5px', 
        cursor: 'pointer',
      }}>XXXL</button>
    </div>
  );
};

export default SizeFilter;
