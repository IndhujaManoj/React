import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import AddTask from './Components/AddTask';
import Container from './../node_modules/react-bootstrap/esm/Container'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import TaskList from './Components/TaskList';


function App() {
  return (
    <Container>
      <Navbar />

      <Row className="justify-content-md-center">
        <Col lg="6">
        <AddTask />
        <TaskList/>
        </Col>
      </Row>
     
    </Container>

  );
}

export default App;


