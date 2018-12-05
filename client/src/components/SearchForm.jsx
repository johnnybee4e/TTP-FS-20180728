import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: "",
      price: ""
    };
  }
  handleSubmit = async evt => {
      evt.preventDefault();
    try {
      const { data }  = await axios.get(
        `https://api.iextrading.com/1.0/stock/${
          this.state.stock
        }/batch?types=price`
      );
      this.setState({ price: data.price });
    } catch {
        alert('Invalid stock symbol. Try again.')
    }
  };

  handleChange = evt => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState({ stock: value });
  };
  render() {
    console.log("stock:", this.state.stock);
    console.log("price:", typeof this.state.price);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.price ? <p>Price: {this.state.price}</p> : null}
          <input
            onChange={this.handleChange}
            name="stock"
            type="text"
            placeholder="Search Stock"
          />
          <button type="sumbit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(SearchForm);
