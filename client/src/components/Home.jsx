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

  handleRandom = async () => {
    console.log('random clicked');
    const randomGif = await axios.get('/api/random');
    console.log(randomGif.data)
    // this.setState({ gifs: [randomGif] });
  };

  async handleTranslate(phrase) {
    const translateGifs = await axios.post('/api/translate', phrase);
    console.log(translateGifs)
    // this.setState({ gifs: translateGifs.data });
  }

  async handleSearch(searchParams) {
    const searchGifs = await axios.post('/api/search', searchParams);
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
        <SearchBar handleRandom={this.handleRandom} />
        {gifs.map(gif => (
          <GifCard key={gif.url} props={gif} />
        ))}
      </div>
    );
  }
}

export default Home;
