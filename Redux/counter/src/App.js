import logo from './logo.svg';
import './App.css';
import { Counter } from './components/Counter';
import { Head } from './components/Head';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}/>

        <Route path='/counter' element={<Counter/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
