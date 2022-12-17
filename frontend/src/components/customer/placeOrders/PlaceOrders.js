import React, { useState } from "react";
import "./placeOrders.css";
import { useSelector } from "react-redux";
import { placeOrder } from "../../../api/index";
import { Navigate, Link } from "react-router-dom";

export default function PlaceOrders() {
  const [ordersPage, setOrdersPage] = useState(false);
  const customer = useSelector((state) => state.customer.customer);
  const buyNowList = useSelector((state) => state.customer.buyNowList);
  var date = new Date();
  date.setDate(date.getDate() + 7);
  var totalAmount = 0;
  buyNowList.forEach((item) => {
    totalAmount =
      totalAmount +
      Math.floor(
        (item.device.details.price * (100 - item.device.details.discount)) / 100
      ) *
        item.qty;
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [delAdd, setDelAdd] = useState();
  async function handleBuyNow() {
    if (!delAdd) {
      setErrorMsg(true);
    } else {
      const res = await placeOrder(customer.id, {
        products: buyNowList,
        deliveryAddress: delAdd,
        deliveryDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        amount: totalAmount,
      });
      if (res.success) {
        setOrdersPage(true);
      }
    }
  }

  return (
    <>
      {ordersPage ? (
        <Navigate to="/myorders" />
      ) : (
        <div className="place-orders">
          <div className="place-orders-box">
            <div className="customer-details">
              <div className="personal-info">
                <div style={{ fontWeight: "700" }}>Your details</div>
                <div>Name: {customer.name}</div>
                <div>Email: {customer.email}</div>
              </div>
              <div className="delivery-info">
                <div
                  className="delivery-info-head"
                  style={{ fontWeight: "700" }}
                >
                  Delivery Details
                </div>
                <div className="date-of-del">
                  Date of delivery: {date.getDate()}/{date.getMonth()}/
                  {date.getFullYear()}
                </div>
                <div className="add-of-del">
                  <div className="add-of-del-head">
                    Delivery Address:
                    {errorMsg && (
                      <span style={{ margin: "5px", color: "red" }}>
                        *Please select one address
                      </span>
                    )}
                  </div>
                  <div className="add-of-del-body">
                    {customer.id &&
                      customer.address.map((item) => (
                        <div
                          key={item._id}
                          className="add-of-del-option"
                          id={item._id}
                          onClick={() => {
                            setDelAdd(item);
                            if (
                              document.querySelector(
                                ".add-of-del-option-selected"
                              )
                            ) {
                              document
                                .querySelector(".add-of-del-option-selected")
                                .classList.remove("add-of-del-option-selected");
                            }
                            document
                              .getElementById(item._id)
                              .classList.add("add-of-del-option-selected");
                          }}
                        >
                          <div>{item.type} - </div> &nbsp;
                          <div>
                            {item.address}
                            <br />
                            {item.city} {item.state} ({item.pincode})
                          </div>
                        </div>
                      ))}
                    {customer.id && customer.address.length == 0 && (
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <i
                          class="fa-solid fa-map-location-dot"
                          style={{ fontSize: "42px", marginBottom: "10px" }}
                        ></i>
                        No address found
                        <Link to="/deliverydetails"><button className="button1">Add New Address</button></Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="payment-info">
                <div style={{ fontWeight: "700" }}>Payment Details</div>
                <div>Total Amount - &#8377;{totalAmount}</div>
                <div>Payment Mode - Cash on delivery</div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      handleBuyNow();
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
            <div className="bn-product-details">
              <div className="bn-products-list">
                <div style={{ fontWeight: "700", margin: "5px" }}>
                  Product Details
                </div>
                {buyNowList &&
                  buyNowList.map((item) => (
                    <div
                      key={item.device._id}
                      className="bn-products-list-item"
                    >
                      <div>
                        <img
                          src={item.device.img}
                          style={{ height: "100px" }}
                        ></img>
                      </div>
                      <div>
                        <div style={{ fontWeight: "700" }}>
                          {item.device.name}
                        </div>
                        <div style={{ color: "gray", marginTop: "-5px" }}>
                          {item.device.brand}
                        </div>
                        <div>
                          &#8377;
                          {Math.floor(
                            (item.device.details.price *
                              (100 - item.device.details.discount)) /
                              100
                          )}{" "}
                          x {item.qty}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
