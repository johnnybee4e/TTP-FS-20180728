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
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    console.log(
      'target name',
      evt.target.name,
      'input',
      this.state.input,
      'endpoint',
      this.state.endpoint
    );
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log('submit clicked');
    console.log('props', this.props);
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
        <label>Search or Translate?</label>
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
        <button className="" type="submit">
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
