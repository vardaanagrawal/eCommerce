export function authenticate(data) {
  return async function (dispatch) {
    dispatch({
      type: "AUTH",
      payload: data,
    });
  };
}
