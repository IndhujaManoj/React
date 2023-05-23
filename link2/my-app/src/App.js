import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import Invoices from './Invoices';
import Expenses from './Expenses';

function App() {
  return (
    <div className="App">
     <h1>Bookkeeper!</h1>
     <nav style={{
      borderBottom:"solid 1px",
      paddingBottom:"1rem"
     }}>
      <Link to="/invoices">Invoices</Link> |{" "}
      <Link to="/expenses">Expenses</Link>

     </nav>
     <Outlet/>
    </div>
  );
}

export default App;
