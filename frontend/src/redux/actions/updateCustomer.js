export function updateCustomer(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_CUSTOMER",
      payload: data,
    });
  };
}
