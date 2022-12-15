import React from "react";
import { Navigate } from "react-router-dom";

export default function Order() {
  return !customer.id ? <Navigate to="/authenticate" /> : <div>Order</div>;
}
