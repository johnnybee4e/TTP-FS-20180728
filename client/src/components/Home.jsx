import React, { Component } from 'react';
import { SearchBar, GifCard } from './index';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
    };
  }
  async componentDidMount() {
    const trendingGifs = await axios.get('/api/trending');
    this.setState({ gifs: trendingGifs.data });
  }

  async handleRandom() {
    const randomGif = axios.get('/api/random');
    this.setState({ gifs: randomGif.data });
  }

  async handleTranslate(phrase) {
    const translateGifs = await axios.post('/api/translate', phrase);
    this.setState({ gifs: translateGifs.data });
  }

  async handleSearch(query) {
    const searchGifs = await axios.post('/api/search', query);
    this.setState({ gifs: searchGifs.data });
  }

  handleChange(evt) {
    evt.preventDefault();
  }
  render() {
    const { gifs } = this.state;
    return (
      <div className="App">
        <h1>Welcome to the Gif Factory</h1>
        <SearchBar props="" />
        {gifs.map(gif => (
          <GifCard key={gif.title} props={gif} />
        ))}
      </div>
    );
  }
}

export default Home;
