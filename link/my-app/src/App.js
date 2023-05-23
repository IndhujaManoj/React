import './App.css';
import Home from './Home';
import About from './About';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <h1>Welcome To React router!</h1>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='about' element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
