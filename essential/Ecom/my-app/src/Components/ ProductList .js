import React, { useState } from 'react';
import SizeFilter from './SizeFilter';
import Product from './Product';

const ProductList = ({ products }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (
    
  ) => {
    setSelectedSize(size);
  };

  const filteredProducts = selectedSize
    ? products.filter((product) => product.size === selectedSize)
    : products;

  return (
    <div >
      <SizeFilter handleSizeClick={handleSizeClick} />

      <div>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />

            
        ))}
      </div>
    </div>
  );
};

export default ProductList;
