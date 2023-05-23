import React, { useState } from 'react'
import './purchase.css';
function Purchase({ purchase, deleteItems }) {
   

    function handledeleteItems(index) {
        console.log("del", index)
        const updatedPurchase = purchase.filter((item, i) => i !== index);
         console.log(updatedPurchase,"up")
        deleteItems(index);
    };

    return (
        <div className='purchasediv'>
            <h1 style={
                {
                    textAlign: 'center',
                    marginTop: "30px",
                    backgroundColor: "yellow",
                    padding: "10px"
                }}>My Carts</h1>
            <div className='container'>
                <div>{purchase.map((items, index) => <h1>{items.name}<i className='trash alternate outline icon'
                    style={{ color: "red", padding: "10px" }} onClick={() => handledeleteItems(index)}  >
                </i>     </h1>)}</div>

            </div></div>
    )
}

export default Purchase
