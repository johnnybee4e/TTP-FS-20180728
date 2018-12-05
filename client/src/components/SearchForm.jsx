import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockSymbol: "",
      successful: false,
      stockQuote: {}
    };
  }
  handleSearch = async evt => {
    evt.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.iextrading.com/1.0/stock/${
          this.state.stockSymbol
        }/batch?types=quote`
      );
      console.log("axios result", data.quote);
      this.setState({ successful: true });
      this.setState({ stockQuote: data.quote });
    } catch {
      alert("Invalid stock symbol. Try again.");
    }
  };

  handleChange = evt => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState({ stockSymbol: value });
  };
  render() {
    console.log("stockSymbol:", this.state.stockSymbol);
    console.log("stockQuote:", this.state.stockQuote);
    let { stockQuote } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          {this.state.successful ? <p>Quote {stockQuote.symbol}</p> : null}
          <input
            onChange={this.handleChange}
            name="stock"
            type="text"
            placeholder="Search Stock"
          />
          <button type="sumbit">Search</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(SearchForm);
