import axios from "axios";

//-----auth api------------------------------------------------------------------------
export async function sendOTP(data) {
  const res = await axios.post(`/customer/OTP`, data);
  return res.data;
}
export async function signup(data) {
  const res = await axios.post(`/customer/signup`, data);
  return res.data;
}
export async function login(data) {
  const res = await axios.post(`/customer/login`, data);
  return res.data;
}

//-----customer api---------------------------------------------------------------------
export async function getCustomer(id) {
  const res = await axios.get(`/customer/${id}`);
  return res.data;
}
export async function updateCustomerName(id, name) {
  const res = await axios.post(`/customer/update/name`, {
    id: id,
    name: name,
  });
  return res.data;
}
export async function updateCustomerPassword(id, oldPassword, newPassword) {
  const res = await axios.post(
    `/customer/update/password`,
    {
      id: id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }
  );
  return res.data;
}
export async function deleteCustomer(id) {
  const res = await axios.post(`/customer/delete`, {
    id: id,
  });
  return res.data;
}
export async function addDelAddress(id, data) {
  const res = await axios.post(
    `/customer/deliveryAddress`,
    {
      id: id,
      data: data,
    }
  );
  return res.data;
}

export async function placeOrder(id, data) {
  const res = await axios.post(`/customer/update/orders`, {
    id,
    data,
  });
  return res.data;
}

//-----product api----------------------------------------------------------------------
export async function getRandomProducts() {
  const res = await axios.get(`/product/random`);
  return res.data;
}
export async function getDevice(type, id) {
  const res = await axios.get(`/product/${type}/${id}`);
  return res.data;
}
export async function getAllDevices(type) {
  const res = await axios.get(`/products/${type}/all`);
  return res.data;
}
export async function getBrandsList(type) {
  const res = await axios.get(`/products/brands/${type}`);
  return res.data;
}

//--------------------------------------------------------------------------------
export async function updateCart(type, productID, customerID, quantity) {
  const res = await axios.post(`/customer/cart`, {
    type: type,
    productID: productID,
    customerID: customerID,
    quantity: quantity,
  });
  return res.data;
}
export async function getCart(id) {
  const res = await axios.get(`/customer/cart/${id}`);
  return res.data;
}

export async function removeItemFromCart(customerID, productID) {
  const res = await axios.post(
    `/customer/cart/removeItem`,
    {
      customerID: customerID,
      productID: productID,
    }
  );
  return res.data;
}

//-------------------------------------------------------------------------------------------
//--------Admin Product Routes----------------------------------------------------------------
//-------------------------------------------------------------------------------------------

export async function postProductBrand(type, name) {
  const response = await axios.post(
    `/productBrand/${type}`,
    { name: name }
  );
  return response;
}

export async function getProductBrand(type) {
  const response = await axios.get(
    `/productBrand/${type}`
  );
  console.log(response);
  return response;
}

export async function postProduct(type, brand, name, details, img) {
  const response = await axios.post(`/product/${type}`, {
    brand: brand,
    name: name,
    details: details,
    img: img,
  });
  return response;
}
export async function getProduct(type) {
  const response = await axios.get(`/product/${type}`);
  return response;
}

export async function postProductImg(data) {
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dg1awjvew/upload",
    data
  );
  return response;
}

export async function updateProductImg(id, data, type) {
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dg1awjvew/upload",
    data
  );
  const res = await axios.post(
    `/productImg/update/${type}`,
    {
      id: id,
      img: response.data.secure_url,
    }
  );
  return res;
}
