export function updateCart(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_CART",
      payload: data,
    });
  };
}
