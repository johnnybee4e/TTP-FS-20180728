import React, { Component } from 'react';
// import axios from 'axios';

export default class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: '',
      q: '',
      s: '',
    };
  }

  componentDidMount() {
    if (!this.state.endpoint) this.setState({ endpoint: "search" });
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { endpoint, q, s } = this.state;
    endpoint === 'search'
      ? this.props.handleSearch(q)
      : this.props.handleTranslate(s);
    this.setState({
      endpoint: 'search',
      q: '',
      s: '',
    });
  };

  render() {
    return (
      <form
        className="form-inline my-2 my-lg-0"
        id="form-container"
        onSubmit={this.handleSubmit}
      >
        <label>Search or Translate?</label>
        <select
          onChange={evt => {
            evt.target.name = 'endpoint';
            this.handleChange(evt);
          }}
        >
          <option defaultValue="search">
            Search
          </option>
          <option value="translate">Translate</option>
        </select>
        <input
          value={this.state.endpoint === 'search' ? this.state.q : this.state.s}
          name={this.state.endpoint === 'search' ? this.state.q : this.state.s}
          onChange={this.handleChange}
          className="form-control mr-sm-2"
          type="search"
          placeholder={`${this.state.endpoint}`}
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

// <label className="nav-item dropdown">How New?</label>
//         <select onChange={this.props.handleChange}>
//           <option value={true}>Newest to Oldest</option>
//           <option value={false}>Oldest to Newest</option>
//         </select>
