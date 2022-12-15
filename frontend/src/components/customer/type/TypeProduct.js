import React from "react";
import { Link } from "react-router-dom";
import { storeDevice } from "../../../redux/actions/storeDevice";
import { useDispatch } from "react-redux";

export default function TypeProduct({ item, type }) {
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
      <div className="type-product">
        <div className="type-product-img">
          <img src={item.img}></img>
        </div>
        <div className="type-product-name">{item.name}</div>
        <div className="type-product-brand">{item.brand}</div>
        <div className="type-product-details" style={{ height: "75px" }}>
          {item.details.cpu} processor | {item.details.ram} RAM |{" "}
          {item.details.rom} internal storage |{" "}
          {item.details.screen.split(" ")[0]}" screen{" "}
        </div>
        <div className="type-product-price">
          &#8377;
          {Math.floor(
            (item.details.price * (100 - item.details.discount)) / 100
          )}
          &nbsp;
          <span style={{fontSize: "large",color: "grey", textDecoration: "line-through"}}>&#8377;{item.details.price}</span>
        </div>
      </div>
    </Link>
  );
}
