export function storeAllProducts(data, type) {
  return async function (dispatch) {
    dispatch({
      type: "STORE_ALL_PRODUCTS",
      payload: {
        data: data,
        type: type,
      },
    });
  };
}
