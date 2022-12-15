export function buyNow(data) {
  return async function (dispatch) {
    console.log(data);
    dispatch({
      type: "BUY_NOW",
      payload: data,
    });
  };
}
