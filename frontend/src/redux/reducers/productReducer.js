const product = (state = {}, action) => {
  if (action.type === "STORE_RANDOM_PRODUCTS") {
    state = {
      ...state,
      randomMobiles: action.payload.mobileData,
      randomLaptops: action.payload.laptopData,
      randomTablets: action.payload.tabletData,
    };
  } else if (action.type === "STORE_DEVICE") {
    state = {
      ...state,
      device: action.payload,
    };
  } else if (action.type === "STORE_ALL_PRODUCTS") {
    if (action.payload.type === "mobiles") {
      state = {
        ...state,
        allMobiles: action.payload.data,
      };
    } else if (action.payload.type === "laptops") {
      state = {
        ...state,
        allLaptops: action.payload.data,
      };
    } else if (action.payload.type === "tablets") {
      state = {
        ...state,
        allTablets: action.payload.data,
      };
    }
  }
  return state;
};

export default product;
