import React from "react";
import { Link } from "react-router-dom";
import { storeDevice } from "../../../redux/actions/storeDevice";
import { useDispatch } from "react-redux";

export default function ProductCard({ item, type }) {
  const dispatch = useDispatch();
  function handleProduct() {
    dispatch(storeDevice(item));
  }
  return (
    <Link
      onClick={() => {
        handleProduct();
      }}
      to={`/${type}/${item.brand}/${item._id}`}
    >
      <div className="product-card">
        <div className="product-card-img">
          <img src={item.img}></img>
        </div>
        <div className="product-card-name">{item.name}</div>
        <div className="product-card-brand">{item.brand}</div>
      </div>
    </Link>
  );
}
