import axios from "axios";
const baseURL = "http://localhost:7000";

//-----auth api------------------------------------------------------------------------
export async function sendOTP(data) {
  const res = await axios.post(`${baseURL}/customer/OTP`, data);
  return res.data;
}
export async function signup(data) {
  const res = await axios.post(`${baseURL}/customer/signup`, data);
  return res.data;
}
export async function login(data) {
  const res = await axios.post(`${baseURL}/customer/login`, data);
  return res.data;
}

//-----customer api---------------------------------------------------------------------
export async function getCustomer(id) {
  const res = await axios.get(`${baseURL}/customer/${id}`);
  return res.data;
}
export async function updateCustomerName(id, name) {
  const res = await axios.post(`${baseURL}/customer/update/name`, {
    id: id,
    name: name,
  });
  return res.data;
}
export async function updateCustomerPassword(id, oldPassword, newPassword) {
  const res = await axios.post(`${baseURL}/customer/update/password`, {
    id: id,
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
  return res.data;
}
export async function deleteCustomer(id) {
  const res = await axios.post(`${baseURL}/customer/delete`, { id: id });
  return res.data;
}
export async function addDelAddress(id, data) {
  const res = await axios.post(`${baseURL}/customer/deliveryAddress`, {
    id: id,
    data: data,
  });
  return res.data;
}

export async function placeOrder(id, data) {
  const res = await axios.post(`${baseURL}/customer/update/orders`,{id,data});
  return res.data;
}

//-----product api----------------------------------------------------------------------
export async function getRandomProducts() {
  const res = await axios.get(`${baseURL}/product/random`);
  return res.data;
}
export async function getDevice(type, id) {
  const res = await axios.get(`${baseURL}/product/${type}/${id}`);
  return res.data;
}
export async function getAllDevices(type) {
  const res = await axios.get(`${baseURL}/products/${type}/all`);
  return res.data;
}
export async function getBrandsList(type) {
  const res = await axios.get(`${baseURL}/products/brands/${type}`);
  return res.data;
}

//--------------------------------------------------------------------------------
export async function updateCart(type, productID, customerID, quantity) {
  const res = await axios.post(`${baseURL}/customer/cart`, {
    type: type,
    productID: productID,
    customerID: customerID,
    quantity: quantity,
  });
  return res.data;
}
export async function getCart(id) {
  const res = await axios.get(`${baseURL}/customer/cart/${id}`);
  return res.data;
}

export async function removeItemFromCart(customerID, productID) {
  const res = await axios.post(`${baseURL}/customer/cart/removeItem`, {
    customerID: customerID,
    productID: productID,
  });
  return res.data;
}
