import React, { Component } from 'react';
import { Navbar } from './components';
import Routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;


