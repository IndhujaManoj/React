import React, { useState } from 'react';
import axios from 'axios'; 
import MessageComponent from './sms';

const App= () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
console.log(phoneNumber,"pp")
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendSMS = async () => {
    try {
      // Replace with your Twilio API credentials
      const accountSid = 'AC0ea2004b0191e043b7d52ffcd534c7ae';
      const authToken = '03cb77e3d754033098dc89d418ebe516';
      const twilioPhoneNumber = '+17175368708'; // This should be your Twilio phone number
  
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          From: twilioPhoneNumber, // Use your Twilio phone number here
          Body: message, 
          To:phoneNumber, 

        },
        {
          auth: {
            username: accountSid,
            password: authToken,
          },
        }
      );
  
      console.log('SMS sent successfully!', response.data);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };
  
  return (
    // <div>
    //   <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" />
    //   <textarea value={message} onChange={handleMessageChange} placeholder="Message" />
    //   <button onClick={handleSendSMS}>Send SMS</button>
   // </div>
   <MessageComponent/> 

  );
};

export default App;
