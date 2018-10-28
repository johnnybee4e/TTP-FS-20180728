import React, { Component } from 'react';

export default class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: '',
      q: '',
      s: '',
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { query, rating } = this.state;
    this.props.handleRequest(query, rating);
    // This will clear before data is loaded for better UX
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <form
        className="form-inline my-2 my-lg-0"
        id="form-container"
        onSubmit={this.handleSubmit}
      >
        <label>Rating</label>
        <select
          onChange={evt => {
            evt.target.name = 'endpoint';
            this.handleChange(evt);
          }}
        >
          <option value="search">Search</option>
          <option value="translate">Translate</option>
        </select>
        <label className="nav-item dropdown">How New?</label>
        <select onChange={this.props.handleChange}>
          <option value={true}>Newest to Oldest</option>
          <option value={false}>Oldest to Newest</option>
        </select>
        <input
          value={this.state.query}
          name="query"
          onChange={this.handleChange}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
