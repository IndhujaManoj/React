import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import data from '../service/data.json';

export const CartList = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const allData = data.data;
  const cartItemCounts = {};

  cartItems.forEach(itemId => {
    cartItemCounts[itemId] = (cartItemCounts[itemId] || 0) + 1;
  });

  const filteredData = allData.filter(item => cartItems.includes(item.id));

  const handleAddItem = itemId => {
    setCartItems(prevItems => [...prevItems, itemId]);
  };

  const handleDeleteItem = itemId => {
    setCartItems(prevItems => prevItems.filter(id => id !== itemId));
  };

  const handleDecreaseItem = itemId => {
    setCartItems(prevItems => {
      const index = prevItems.indexOf(itemId);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      }
      return prevItems;
    });
  };

  return (
    <div style={styles.cartContainer}>
      <h2>Cart</h2>

      {filteredData.length > 0 && (
        <div style={styles.cardsContainer}>
          {filteredData.map((item, index) => (
            <div key={index} style={styles.card}>
              <img src={item.image} alt={`Image of ${item.name}`} style={styles.image} />
              <div style={styles.cardDetails}>
                <div style={styles.itemDetails}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemPrice}>{item.price}</span>
                </div>
                <div style={styles.itemButtons}>
                  <button onClick={() => handleAddItem(item.id)} style={styles.addButton}>
                    +
                  </button>
                  <span style={styles.itemCount}>{cartItemCounts[item.id]}</span>
                  <button onClick={() => handleDecreaseItem(item.id)} style={styles.decreaseButton}>
                    -
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length === 0 && filteredData.length === 0 && (
        <p style={styles.emptyMessage}>Your cart is empty</p>
      )}
    </div>
  );
};

const styles = {
  cartContainer: {
    textAlign: 'center',
    margin: '20px',
  },
  cardsContainer: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridWrap: 'wrap',
    gap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '500px',
    marginRight: '500px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '50%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'auto',
  
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '100%',
    width:"250px"
  },
  image: {
    width: '80px',
    height: '80px',
    marginBottom: '10px',
    borderRadius: '50%',
  },
  cardDetails: {
    flex: '1',
    width: '100%',
  },
  itemDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemPrice: {
    marginLeft: '10px',
  },
  itemButtons: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  itemCount: {
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  decreaseButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  emptyMessage: {
    fontStyle: 'italic',
  },
};

