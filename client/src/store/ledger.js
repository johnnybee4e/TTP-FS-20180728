import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_LEDGER = "GET_LEDGER";

/**
 * INITIAL STATE
 */

const defaultLedger = [];

/**
 * ACTION CREATORS
 */

const getLedger = ledger => ({
  type: GET_LEDGER,
  ledger
});

/**
 * THUNK CREATORS
 */

export const fetchLedger = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/ledger`);
    dispatch(getLedger(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */

export default (state = defaultLedger, action) => {
  switch (action.type) {
    case GET_LEDGER:
      return action.ledger;
    default:
      return state;
  }
};
