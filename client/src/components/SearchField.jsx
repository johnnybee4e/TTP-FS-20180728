import React, { Component } from 'react';
// import axios from 'axios';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '',
      input: '',
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
    console.log('submit clicked');
    const { endpoint, input } = this.state;
    console.log('endpoint!', endpoint);
    endpoint === 'search'
      ? this.props.handleSearch(input)
      : this.props.handleTranslate(input);
    this.setState({
      input: '',
    });
  };

  render() {
    return (
      <form className="" id="form-container" onSubmit={this.handleSubmit}>
        <select
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
