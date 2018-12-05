import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLedger } from "../store";

class Ledger extends Component {
  componentDidMount() {
    this.props.fetchLedgerOnDidMount(this.props.userId);
  }
  render() {
    const { ledger } = this.props;
    return (
      <section>
        <h2>Buy/Trade History</h2>
        {ledger.map(transaction => (
          <div key={transaction.id}>
            <h3>
              {/*transaction.type.slice(0, 1).toUpperCase() +
                transaction.type.slice(1)*/}
                Buy
            </h3>
            <h4>Ticker Symbol: {transaction.stockSymbol}</h4>
            <p>Price Per Share: {transaction.stockPrice}</p>
            <p># of Shares: {transaction.quantity}</p>
            <p>Total: {transaction.total}</p>
          </div>
        ))}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  ledger: state.ledger
});

const mapDispatchToProps = dispatch => ({
  fetchLedgerOnDidMount: userId => dispatch(fetchLedger(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
