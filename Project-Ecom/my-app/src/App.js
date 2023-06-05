import { Provider } from 'react-redux';
import './App.css';
import Index from './routes/Index';
import Store from './Redux/Store';

function App() {
  return (
    <Provider store={Store}>
        <div className="App">
      <Index />
    </div>
    </Provider>
  
  );
}

export default App;
