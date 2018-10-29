import React, { Component } from 'react';
// import axios from 'axios';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '',
      input: '',
      rating: '',
    };
  }

  componentDidMount() {
    if (!this.state.endpoint) this.setState({ endpoint: 'search' });
  }

  handleChange = async evt => {
    evt.preventDefault();
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { endpoint, input, rating } = this.state;
    endpoint === 'search'
      ? this.props.handleSearch(input, rating)
      : this.props.handleTranslate(input, rating);
    this.setState({
      input: '',
      rating: ''
    });
  };

  render() {
    return (
      <form className="" id="form-container" onSubmit={this.handleSubmit}>
      <label>Rating Filter</label>
      <select className='search-field-dropdown'
      onChange={evt => {
        evt.target.name = 'rating';
        this.handleChange(evt);
      }}
    >
      <option value="''">All</option>
      <option value="y">Y</option>
      <option value="g">G</option>
      <option value="pg">PG</option>
      <option value="pg-13">PG-13</option>
      <option value="r">R</option>
    </select>
        <select className='search-field-dropdown'
          onChange={evt => {
            evt.target.name = 'endpoint';
            this.handleChange(evt);
          }}
        >
          <option value="search">Search</option>
          <option value="translate">Translate</option>
        </select>
        <input
          value={this.state.input}
          name="input"
          onChange={this.handleChange}
          className=""
          type="search"
          placeholder={`${this.state.endpoint}`}
          aria-label="Search"
        />
        <button className='search-bar-button' type="submit">
          Submit
        </button>
      </form>
    );
  }
}
