import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Counter from './counter';
import Hooks from './Hooks';
import Table from './table';
//import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
/*var intervel=setInterval(() => {

root.render(
   // <React.StrictMode>
   <div>
      <p> <Counter /></p>
      </div>
  

  //  </React.StrictMode>

);
},1000)*/
root.render(
  <div className='mine'>
    <h1>Table1</h1>
<p><Table/></p>
  </div>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
