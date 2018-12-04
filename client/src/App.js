import React, { Component } from 'react';
import { Navbar } from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Navbar />
      </div>
    );
  }
}

export default App;
