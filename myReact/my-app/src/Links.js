import React from 'react'
import elogo from '../images/elogo.jpg'
import './App.css'

function Links() {
    return (
        <div className='App'>
            <div className='appdiv'>



                {/* <Register/> */}
                {/* <nav >
                    <Link to='/register' className='links'>Register</Link>
                    <Link to='/login' className='links'>Login</Link>

                    <Link to="/about" className='links'>About</Link>
                    <Link to="/products" className='links'>Products</Link>
                </nav><Outlet /> */}
            </div>
            <div className='bg'>

                <h1 style={{ textAlign: "center" }}>Welcome to this page!!</h1>
                <div className='logo'>
                    <img src={elogo} />
                </div>
                <div className='para'>
                    <h1> Product descriptions let you put your customers first</h1>

                    <h3>If you’ve been reading this blog for a while, you’ve probably seen at least one of our customer spotlights. We love our customers!<br /> As a former small business marketer myself, I love our passionate dedication to empowering and supporting small business growth.<br />

                        For your business, too, your customers’ wins are your wins. If you’re a small retailer, this is true not just with your in-store customer service,<br /> but also your ecommerce website’s overall UX, its check-out flow, your online return options, and your product descriptions.<br /> By writing accurate, educational, and engaging product descriptions, a copywriter serves their customers just as much as a sales associate <br />does when someone walks through your shop’s front door.

                        In fact, your product description is arguably your best opportunity to<br /> provide the heart and soul of that in-store experience for online shoppers. It’s also your chance to snag prospects who research <br />online before buying in-store, as do a whopping 81% of retail buyers.

                        Don’t worry—you don’t need to be a brilliant copywriter<br /> to write product descriptions that work.

                        You just need to keep your customer first. Not sure how?<br/> Here are five examples of epic product descriptions that you can learn from and use as inspiration.
                        <h1>Features:</h1>

                        Teaches appropriate chewing behavior while offering mental enrichment
                        Soft Puppy KONG<br/> rubber formula is customized for puppy teeth andgums
                        Unpredictable bounce for games <br/>of fetch
                        Great for stuffing with KONG Puppy Easy Treat, Snacks or Ziggies

                        This does a<br/> wonderful job of addressing the problems, needs, and worries of new pet parents. <br/>Here are three great examples from the copy.
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Links
