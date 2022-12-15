const customer = (state = { customer: {} }, action) => {
  if (action.type === "UPDATE_CUSTOMER") {
    state = { ...state, customer: action.payload };
  } else if (action.type === "UPDATE_CART") {
    state = { ...state, cart: action.payload };
  } else if (action.type === "BUY_NOW") {
    state = { ...state, buyNowList: action.payload };
  }
  return state;
};

export default customer;
