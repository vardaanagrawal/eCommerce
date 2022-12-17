import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCustomer } from "../../../api";
import { updateCustomer } from "../../../redux/actions/updateCustomer";
import { useDispatch } from "react-redux";

export default function Order() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);

  useEffect(() => {
    getDetails();
  }, []);

  async function getDetails() {
    const res = await getCustomer(customer.id);
    dispatch(updateCustomer(res.data));
  }

  return !customer.id ? (
    <Navigate to="/authenticate" />
  ) : (
    <div className="my-orders">
      {customer.id &&
        customer.orders
          .slice(0)
          .reverse()
          .map((item, index) => (
            <div className="my-orders-item" key={item._id}>
              <b>Order #{customer.orders.length - index}</b>
              <div
                className="orders-products"
                style={{
                  height: "250px",
                  overflow: "scroll",
                  border: "solid silver 1px",
                  margin: "10px 0px",
                }}
              >
                {item.products &&
                  item.products.map((product) => (
                    <div
                      key={product._id}
                      style={{
                        display: "flex",
                        border: "solid silver 1px",
                        margin: "5px",
                      }}
                    >
                      <div>
                        <img
                          src={product.device.img}
                          style={{ height: "100px" }}
                        ></img>
                      </div>
                      <div>
                        <div>{product.device.name}</div>
                        <div>{product.device.brand}</div>
                        <div>
                          {Math.floor(
                            (product.device.details.price *
                              (100 - product.device.details.discount)) /
                              100
                          )}{" "}
                          x {product.qty}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <b>Total amount: </b>&#8377;{item.amount}
              </div>
              <div>
                <b>Delivery Date:</b> {item.deliveryDate}
              </div>
              <div>
                <b>
                  Delivery Address: <br />
                </b>
                {item.deliveryAddress.type} - {item.deliveryAddress.address},{" "}
                {item.deliveryAddress.city} {item.deliveryAddress.state} (
                {item.deliveryAddress.pincode})
              </div>
            </div>
          ))}
    </div>
  );
}
