import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("" );
  const [message, setMessage] = useState('');

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
      const twilioPhoneNumber = "+17175368708"; // Your Twilio phone number in E.164 format

      // Ensure phone number is in E.164 format (e.g., "+1234567890")
      const formattedPhoneNumber = phoneNumber.trim(); // Remove leading/trailing spaces
      const toPhoneNumber = `${formattedPhoneNumber}`;

      // Perform some basic validation
      if (!formattedPhoneNumber || !message) {
        console.error('Phone number and message are required.');
        return;
      }

      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          From: twilioPhoneNumber,
          Body: message,
        //   To: toPhoneNumber,
        "To": "+15712696239"
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
    <div>
      <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" />
      <textarea value={message} onChange={handleMessageChange} placeholder="Message" />
      <button onClick={handleSendSMS}>Send SMS</button>
      {/* <MessageComponent/> */}
    </div>
  );
};

export default App;
