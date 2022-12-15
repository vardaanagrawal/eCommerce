export function storeDevice(data) {
    return async function (dispatch) {
      dispatch({
        type: "STORE_DEVICE",
        payload: data,
      });
    };
  }
  