import React from 'react'
import './About.css';
import computer from '../images/comp.png'
import person from '../images/person.png'
import tick from '../images/tick.jpg'
import earth from '../images/earth.png'



function About() {
    return (
        <div>
            <h2>About</h2>
            <div className='aboutpg'>
                <h1 >A simply way you start your online store</h1>
                <div className='images'>
                    <div className='img1'>
                        <img src={computer} />
                        <h2>Expand your reach</h2>
                        <h4>Sell your products on your<br/> own mobile-friendly website<br/> and through popular platforms <br/>like Facebook, Instagram and Amazon.</h4>
                    </div>
                    <div className='img1'>
                        <img src={person} />
                        <h2>Boost customer<br/> engagement</h2>
                        <h4>Create automated emails as<br/> well as custom messages<br/> and offers that turn visitors<br/> into customers.</h4>

                    </div>
                    <div className='img1'>
                        <img src={tick} />
                        <h2>Free features included</h2>
                        <h4>All our plans come with web<br/> hosting included, along with <br/>a free domain, email address <br/>and SSL Certificate.</h4>
                    </div>
                    <div className='img1'>
                        <img src={earth}/>
                        <h2>Run your shop from <br/>anywhere</h2>
                        <h4>Promote your services, track <br/>sales and manage your inventory<br/> from anywhere, on any device.</h4><br/><br/>
                    </div>
                </div>
                <h5 >About Our Page</h5>
                <p>With the evolution of technology and the wave of digitalization, more and more businesses are adapting to tech evolutions.<br/> You will find the digital payment options with the grocery sellers & street-side vendors as well.<br/> The ultimate purpose behind this evolution is to make shopping a hassle-free experience for everyone.<br/>

If you are also non-techies who want to take their business online, Builderfly can be your savior.<br/> Builderfly is an ecommerce platform exclusively designed for individuals & businesses to start selling online, <br/>market & grow their business without any technicalities. So take your business to the World at your own pace.</p>
            </div>
        </div>
    )
}

export default About
