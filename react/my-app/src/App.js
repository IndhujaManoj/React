import logo from './logo.svg';
import './App.css';
import Welcome from './welcome';
import Table from './table';
import { Component } from 'react';

class App extends Component{
   render(){
   return(
      <div className='mine'> 
      <h1>Table</h1>
      <Table/>
      </div>
   )
}}
export default App;
