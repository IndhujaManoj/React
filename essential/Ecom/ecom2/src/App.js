import logo from './logo.svg';
import './App.css';
import { Products } from './Components/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartList } from './Components/CartList'; 
import { Use } from './Components/Use';
import { Inuput } from './Components/Inuput';

const App = () => {
  return (
    <Inuput/>
    // <Use/>
    // <Router>
    //   <Routes>
    //     <Route path="/cart" element={<CartList />} /> 
    //     <Route path="/" element={<Products />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
