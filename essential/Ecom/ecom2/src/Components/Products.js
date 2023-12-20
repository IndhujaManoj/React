import React, { useState } from "react";
import data from "../service/data.json";
import { Button } from "./Button";
import { Header } from "./Header";

export const Products = () => {
  const products = data.data;
  const [size, setSize] = useState(null);
const [cartItems, setCartItems] = useState([]);
  let filter = size ? products.filter((item) => item.size === size) : products;
console.log(cartItems,"j")
  const handleSizeClick = (size) => {
    setSize(size);
  };
const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
}
  return (
    <div style={{ padding: '20px' }}>
      <Header cartItems={cartItems} />
      <Button handleSizeClick={handleSizeClick} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filter.map((item, index) => (
          <div key={index} style={{ textAlign: 'center', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img
              src={item.image}
              alt={`Product ${index}`}
              style={{ height: "150px", width: "150px", borderRadius: "10px", marginBottom: '10px' }}
            />
            <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>{item.size}</p>
            <p style={{ marginBottom: '10px' }}>Price: ${item.price}</p>
            <button style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => {handleAddToCart(item.id) }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

