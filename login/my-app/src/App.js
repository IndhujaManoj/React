import logo from './logo.svg';
import './App.css';

import Login from './Login';
import Reg from './Reg';
import { Link, Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <nav>
      <Link to="/login">Login</Link><br/><br/>
    <Link to="/reg">Register</Link>
      </nav>
   <Outlet/>
    </div>
  );
}

export default App;
