import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "../components/admin/Admin";
import Auth from "../components/auth/Auth";
import Account from "../components/customer/account/Account";
import Delivery from "../components/customer/account/Delivery";
import Order from "../components/customer/account/Order";
import Customer from "../components/customer/Customer";
import Home from "../components/customer/home/Home";
import PlaceOrders from "../components/customer/placeOrders/PlaceOrders";
import Product from "../components/customer/product/Product";
import Type from "../components/customer/type/Type";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Customer />}>
          <Route exact path="" element={<Home />}></Route>
          <Route exact path="account" element={<Account />}></Route>
          <Route exact path="deliverydetails" element={<Delivery />}></Route>
          <Route exact path="myorders" element={<Order />}></Route>
          <Route exact path=":type" element={<Type />}></Route>
          <Route
            exact
            path=":type/:brand/:device"
            element={<Product />}
          ></Route>
          <Route exact path="placeorder" element={<PlaceOrders/>}></Route>
        </Route>
        <Route exact path="/authenticate" element={<Auth />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
