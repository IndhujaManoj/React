import React from 'react';

const Product = ({ product }) => {
  return (
    <div key={product.id} style={cardStyle}>
      <img src={product.image} alt={product.name} style={imageStyle} />
      <div style={textContainerStyle}>
        <p>{product.name}</p>
        <p>Size: {product.size}</p>
        <p>Price: ${product.price}</p>
        {product.delivery && <p>{product.delivery}</p>}
      </div>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '8px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const imageStyle = {
  maxWidth: '100px',
  marginBottom: '10px',
};

const textContainerStyle = {
  textAlign: 'left',
};

export default Product;
