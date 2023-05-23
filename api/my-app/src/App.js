
import './App.css';
import Create from './Create';
import { BrowserRouter, Link, Outlet, Routes ,Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Form from './Form';
function App() {
  return (
    <div>
    
    <BrowserRouter>
    
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/login' element={<Login/>} />

    <Route path='/create' element={<Create/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/form' element={<Form/>}/>
    </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
