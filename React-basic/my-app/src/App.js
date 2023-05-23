import logo from './logo.svg';
import './App.css';
import Table from './Table';
import { Component } from 'react';
class App extends Component {
  render() {
    const characters = [
      {
        name: "indhu",
        course: "B.Tech"
      },
      {
        name: "nandhu",
        course: "B.Tech"
      },
      {
        name: "bindhu",
        course: "B.Tech"
      },
      {
        name: "indhu",
        course: "B.Tech"
      }
    ]
    return (
      <div className="container">
        <h2>Table</h2>

        <Table charactersData={characters}/>
      </div>
    );
  }
}

export default App;
