import React, { Component } from 'react';
import GifCard from './GifCard';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      currentGif: {},
    };
  }
  async componentDidMount() {
    const trendingGifs = await axios.get('/api/trending');
    this.setState({ gifs: trendingGifs.data });
  }
  render() {
    const { gifs } = this.state;
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>TRENDING GIFS!</p>
          {gifs.map(gif => (
            <GifCard key={gif.title} props={gif} />
          ))}
      </div>
    );
  }
}

export default App;
