import React, { useEffect, useState } from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { storeDevice } from "../../../redux/actions/storeDevice";
import { getDevice, removeItemFromCart, updateCart } from "../../../api/index";
import { updateCart as updateCartRedux } from "../../../redux/actions/updateCart";
import { buyNow } from "../../../redux/actions/buyNow";
import { Navigate } from "react-router-dom";

export default function Product() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.device);
  useEffect(() => {
    if (!data) {
      const type = window.location.href.split("/")[3];
      const id = window.location.href.split("/")[5];
      fetchDevice(type, id);
    }
  }, []);

  async function fetchDevice(type, id) {
    const res = await getDevice(type, id);
    if (res.success) {
      dispatch(storeDevice(res.data));
    } else {
      window.location.href = "/";
    }
  }

  const customer = useSelector((state) => state.customer.customer);

  async function addToCart() {
    if (!customer.id) {
      alert("To access cart, please login");
    } else {
      setCartoader(true);
      const type = window.location.href.split("/")[3];
      const res = await updateCart(type, data._id, customer.id, 1);
      dispatch(updateCartRedux(res.cart));
      setCartoader(false);
    }
  }
  const [buy, setBuy] = useState(false);
  const [cartLoader, setCartoader] = useState(false);
  const a = useSelector((state) => state.customer);
  function handleBuyNow() {
    const type = window.location.href.split("/")[3];
    const id = window.location.href.split("/")[5];
    const list = [
      {
        productID: id,
        img: data.img,
        name: data.name,
        brand: data.brand,
        qty: 1,
        price: Math.floor(
          (data.details.price * (100 - data.details.discount)) / 100
        ),
        type: type,
      },
    ];
    dispatch(buyNow(list));
    setBuy(true);
  }

  return (
    <div className="product">
      {buy && <Navigate to="/placeorder" />}
      {data && !buy && (
        <div className="product-box">
          <div className="product-img">
            <img src={data.img}></img>
          </div>
          <div className="product-info">
            <div className="product-name">{data.name}</div>
            <div className="product-brand">{data.brand}</div>
            <div className="product-details">
              <div className="product-details-head">Description</div>
              <div className="product-details-list">
                - {data.details.cpu} processor
                <br />- {data.details.ram} RAM
                <br />- {data.details.rom} internal storage
                <br />- {data.details.screen} screen
              </div>
            </div>
            <div className="product-price">
              <span style={{ fontSize: "xx-large" }}>
                &#8377;
                {Math.floor(
                  (data.details.price * (100 - data.details.discount)) / 100
                )}
              </span>
              &nbsp;
              <span
                style={{
                  fontSize: "large",
                  textDecoration: "line-through",
                  color: "gray",
                }}
              >
                &#8377;{data.details.price}
              </span>
              {/* <span>{data.details.discount}%</span> */}
            </div>
            <div className="product-btns">
              <button
                className="product-bn-btn"
                onClick={() => {
                  handleBuyNow();
                }}
              >
                Buy Now
              </button>
              {!cartLoader && (
                <button
                  className="product-atc-btn"
                  onClick={() => {
                    addToCart();
                  }}
                >
                  Add to Cart
                </button>
              )}
              {cartLoader && (
                <div
                  className="product-atc-btn"
                  style={{
                    padding: "8.5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="loader"
                    style={{
                      borderColor: "black",
                      borderRight: "transparent solid 5px",
                      height: "14px",
                      width: "14px",
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
