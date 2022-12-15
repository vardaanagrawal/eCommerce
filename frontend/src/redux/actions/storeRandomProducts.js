export function storeRandomProducts(data) {
  return async function (dispatch) {
    dispatch({
      type: "STORE_RANDOM_PRODUCTS",
      payload: data,
    });
  };
}
