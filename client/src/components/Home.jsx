import React, { Component } from 'react';
import { SearchBar, GifCard } from './index';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      rating: '',
    };
  }
  componentDidMount() {
    this.handleTrending();
  }

  handleTrending = async rating => {
    const { data } = await axios.get('/api/trending');
    this.setState({ gifs: data });
  };
  handleRandom = async () => {
    const { data } = await axios.get('/api/random');
    console.log(data);
    this.setState({ gifs: [data] });
  };

  handleTranslate = async phrase => {
    const toTranslate = { s: phrase };
    const { data } = await axios.post('/api/translate', toTranslate);
    this.setState({ gifs: [data] });
  };

  handleSearch = async searchParams => {
    console.log('handle search fired!');
    const searchQuery = { q: searchParams };
    const { data } = await axios.post('/api/search', searchQuery);
    console.log('data', data);
    this.setState({ gifs: data });
  };

  render() {
    const { gifs } = this.state;
    console.log(gifs);
    return (
      <div>
        <h1>Welcome to the Gif Factory</h1>
        <SearchBar
          handleRandom={this.handleRandom}
          handleSearch={this.handleSearch}
          handleTranslate={this.handleTranslate}
          handleTrending={this.handleTrending}
        />
        <div id="all-gifs-container">
          {gifs.map(gif => (
            <GifCard key={gif.url} props={gif} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
