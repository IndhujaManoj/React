import React, { useState } from 'react'
import lap from '../images/lap.jpg'
import bag from '../images/bag.jpeg'
import './products.css';
import phone from '../images/phone.jpeg'
import shoes from '../images/shoes.jpeg'
import bottle from '../images/bottle.jpeg'
import earphone from '../images/earphone.jpeg'
import cart from '../images/cart.png'
import { useNavigate } from 'react-router';
function Products({ carts }) {
    const [cartItems, setCartitems] = useState([])
    console.log(cartItems, "b")

    const addTocart = (itemName, itemId) => {
        const newItem =
        {
            name: itemName,
            id: itemId
        }
        setCartitems((prevCartItems) => [...prevCartItems, newItem]); // Add the new item to the previous cartItems state
        carts({ name: newItem.name, id: newItem.id })
    }
    const navi = useNavigate()
    const purchaseList = (event) => {
        event.preventDefault()
        navi('/purchase')
    }
    return (
        <div>
            <div className='cartdiv'>
                <img src={cart} alt='cart' onClick={purchaseList} />
            </div>
            <div className='myproducts'>
                <div class="card" style={{ width: "22rem" }}>
                    <img src={lap} class="card-img-top" alt="lap" />
                    <div class="card-body">
                        <h5 class="card-title">LAPTOP</h5>


                        <p class="card-text"><h6>HP 15s,Intel Core i3- 1115G4,15.6 inch(39.6cm) FHD Anti-Glare Laptop(8GB/512GB/Intel UHD)<h1 style={{ color: "red" }}>-20% </h1><h1 style={{ color: "black" }}>$100</h1></h6></p>
                        <a href="#" class="btn btn-primary" onClick={() => addTocart("Laptop", 1)}>Add to cart</a>
                    </div>
                </div>

                <div class="card" style={{ width: "22rem" }}>
                    <img src={bag} class="card-img-top" alt="lap" />
                    <div class="card-body">
                        <h5 class="card-title">BAG</h5>
                        <p class="card-text"><h6>Uppercase Medium 23 Ltrs Tall Boy(14.6 inch)Laptop Backpack 2500EBP1 3x water resistant bag <h1 style={{ color: "red" }}>-26% </h1><h1 style={{ color: "black" }}>$70</h1></h6>.</p>
                        <a href="#" class="btn btn-primary" onClick={() => addTocart("Bag", 2)}>Add to cart</a>
                    </div>
                </div>

                <div class="card" style={{ width: "22rem" }}>
                    <img src={phone} class="card-img-top" alt="lap" />
                    <div class="card-body">
                        <h5 class="card-title">PHONE</h5>
                        <p class="card-text"><h6>Redmi Note 12 Pro+ 5G(Obsidian Black,8GB RAM,256GB Storage)OS:Android 12.0 6.67 inches<h1 style={{ color: "red" }}>-12% </h1><h1 style={{ color: "black" }}>$90</h1></h6>.</p>
                        <a href="#" class="btn btn-primary" onClick={() => addTocart("Phone", 3)}>Add to cart</a>
                    </div>
                </div>

                <div class="card" style={{ width: "22rem" }}>
                    <img src={shoes} class="card-img-top" alt="lap" />
                    <div class="card-body">
                        <h5 class="card-title">SHOES</h5>
                        <p class="card-text"><h6>Bacca Bucci Project Plus Running Walking Training Gym shoes Specially developed for large foot<h1 style={{ color: "red" }}>-23% </h1><h1 style={{ color: "black" }}>$50</h1></h6></p>
                        <a href="#" class="btn btn-primary" onClick={() => addTocart("Shoes", 4)}>Add to cart</a>
                    </div>
                </div>

                <div class="card" style={{ width: "22rem" }}>
                    <img src={bottle} class="card-img-top" alt="lap" />
                    <div class="card-body">
                        <h5 class="card-title">BOTTLE</h5>
                        <p class="card-text"><h6>MILTON super 1000 Stainless steel water Bottle,1000ml,silver|Leak Proof|Gym bottle|Travel Bottle<h1 style={{ color: "red" }}>-10% </h1><h1 style={{ color: "black" }}>$20</h1></h6></p>
                        <a href="#" class="btn btn-primary" onClick={() => addTocart("Bottle", 5)}>Add to cart</a>
                    </div>
                </div>

                <div class="card" style={{ width: "22rem" }}>
                    <img src={earphone} class="card-img-top" alt="lap" />
                    <div class="card-body">
                        <h5 class="card-title">EAR PHONE</h5>
                        <p class="card-text"><h6>Apple Rockers 400 Bluetooth on earphones with Mic with upto 16 Hours Playback & soft padded Ear cushions(Black/Red)<h1 style={{ color: "red" }}>-20% </h1><h1 style={{ color: "black" }}>$150</h1></h6></p>
                        <a href="#" class="btn btn-primary" onClick={() => addTocart("Ear phone", 6)}>Add to cart</a>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default Products
