const auth = (state = { authResponse: {} }, action) => {
  if (action.type === "AUTH")
    state = { ...state, authResponse: action.payload };
  return state;
};

export default auth;
