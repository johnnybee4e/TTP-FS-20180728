import React, { Component } from 'react';
import { SearchBar, GifCard } from './index';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      randomGif: {},
    };
  }
  async componentDidMount() {
    const trendingGifs = await axios.get('/api/trending');
    this.setState({ gifs: trendingGifs.data });
  }

  handleRandom = async () => {
    const { data } = await axios.get('/api/random');
    this.setState({ randomGif: data });
  };

  handleTranslate = async phrase => {
    const toTranslate = { s: phrase };
    const { data } = await axios.post('/api/translate', toTranslate);
    console.log(data);
    // this.setState({ gifs: translateGifs.data });
  };

  handleSearch = async searchParams => {
    const searchQuery = { q: searchParams };
    const { data } = await axios.post('/api/search', searchQuery);
    console.log('search result', data);
    this.setState({ gifs: data });
  };

  handleHomeChange = async evt => {
    evt.preventDefault();
    console.log('Home change fired');
  };
  render() {
    const { gifs } = this.state;
    console.log('random gif from state', this.state.randomGif);
    return (
      <div className="App">
        <h1>Welcome to the Gif Factory</h1>
        <SearchBar
          handleRandom={this.handleRandom}
          handleSearch={this.handleSearch}
          handleTranslate={this.handleTranslate}
          handleHomeChange={this.handleHomeChange}
        />
        {gifs.map(gif => (
          <GifCard key={gif.url} props={gif} />
        ))}
      </div>
    );
  }
}

export default Home;
