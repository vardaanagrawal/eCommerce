import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getCustomer, getRandomProducts, getAllDevices } from "../../api";
import Navbar from "./navbar/Navbar";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../redux/actions/updateCustomer";
import { storeRandomProducts } from "../../redux/actions/storeRandomProducts";
import { updateCart } from "../../redux/actions/updateCart";
import { getCart } from "../../api/index";
import { storeAllProducts } from "../../redux/actions/storeAllProducts";

export default function Customer() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = window.localStorage.getItem("customer");
    if (id) fetchCustomer(id);
    fetchRandomProducts();
    fetchAllProducts("mobiles");
    fetchAllProducts("tablets");
    fetchAllProducts("laptops");
  }, []);

  async function fetchCustomer(id) {
    const res = await getCustomer(id);
    if (res.success) {
      dispatch(updateCustomer(res.data));
    }
    if (res.data.cart.length) {
      const cart = await getCart(id);
      dispatch(updateCart(cart));
    }
  }

  async function fetchRandomProducts() {
    const res = await getRandomProducts();
    dispatch(storeRandomProducts(res));
  }

  async function fetchAllProducts(type) {
    const res = await getAllDevices(type);
    dispatch(storeAllProducts(res, type));
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
