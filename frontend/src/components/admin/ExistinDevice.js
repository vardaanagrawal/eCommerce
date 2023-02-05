import React, { useEffect, useState } from "react";
import { getProductBrand, getProduct, updateProductImg } from "../../api/index";

export default function ExistingDevice({ device }) {
  const [brandList, setBrandList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [brandFilter, setBrandFilter] = useState("All");
  const [curItem, setCurItem] = useState();

  useEffect(() => {
    fetchBrands();
    fetchProducts();
  }, []);

  function filterProducts(e) {
    if (e == "All") {
      setProductList(allProductList);
    } else {
      setProductList(allProductList.filter((x) => x.brand == e));
    }
  }

  async function fetchBrands() {
    const res = await getProductBrand(device);
    console.log("brands: ", res.data);
    setBrandList(res.data.brand);
  }

  async function fetchProducts() {
    const res = await getProduct(device);
    setAllProductList(res.data);
    setProductList(res.data);
  }

  function openProductDetails() {
    document.querySelector(".existing-device-details").style.display = "block";
    setTimeout(() => {
      document.querySelector(".existing-device-details-box").style.right =
        "0px";
    }, 100);
  }
  function closeProductDetails() {
    document.querySelector(".existing-device-details-box").style.right =
      "-450px";
    setTimeout(() => {
      document.querySelector(".existing-device-details").style.display = "none";
      setCurItem();
    }, 300);
  }

  const [deviceImg, setDeviceImg] = useState();
  const [deviceImgPrev, setDeviceImgPrev] = useState();

  async function handleUpdateImg() {
    const formData = new FormData();
    formData.append("file", deviceImg);
    formData.append("upload_preset", "hddvzsci");
    formData.append("folder", "devices");
    const res = await updateProductImg(curItem._id, formData, device);
    console.log(res.data);
    fetchProducts();
  }

  return (
    <div className="existing-device">
      <div className="existing-device-head">
        <span>
          {brandFilter} {device}s
        </span>
        <select
          onChange={(e) => {
            setBrandFilter(e.target.value);
            filterProducts(e.target.value);
          }}
        >
          <option value="All">All</option>
          
          {brandList.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="existing-device-body">
        {productList.map((item) => (
          <div
            className="existing-device-card"
            key={item._id}
            onClick={() => {
              setCurItem(item);
              openProductDetails();
              setDeviceImgPrev(item.img);
            }}
          >
            <img
              src={item.img}
              style={{ height: "150px", width: "150px" }}
            ></img>
            {item.name}
            <br />
            {item.brand}
          </div>
          // <ProductCard item={item} key={item._id} />
        ))}
      </div>
      {/* ------------------------------------ */}
      <div className="existing-device-details">
        <div className="existing-device-details-box">
          {curItem && (
            <div>
              <div className="existing-device-details-box-head">
                <h2>Product Details</h2>
                <button
                  className="button1"
                  style={{ fontSize: "x-large", padding: "5px 15px" }}
                  onClick={() => {
                    closeProductDetails();
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="existing-device-details-box-body">
                <div
                  style={{
                    backgroundColor: "blue",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={deviceImgPrev}
                    style={{ height: "200px", width: "240px" }}
                  ></img>
                  <label
                    htmlFor="product-new-img"
                    style={{
                      backgroundColor: "goldenrod",
                      fontSize: "large",
                      fontWeight: "bold",
                      color: "white",
                      textAlign: "center",
                      position: "absolute",
                      height: "40px",
                      width: "40px",
                      lineHeight: "40px",
                      borderRadius: "50%",
                      right: "20px",
                    }}
                  >
                    Edit
                  </label>
                  <input
                    type="file"
                    id="product-new-img"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setDeviceImg(e.target.files[0]);
                      setDeviceImgPrev(URL.createObjectURL(e.target.files[0]));
                    }}
                  ></input>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <div style={{ fontSize: "larger", fontWeight: "bolder" }}>
                    {curItem.name}
                  </div>
                  <span>{curItem.brand}</span>
                </div>
                <div style={{ gridColumn: "1 / 3" }}>
                  <ul>
                    <li>CPU: {curItem.details.cpu}</li>
                    <li>RAM: {curItem.details.ram}</li>
                    <li>ROM: {curItem.details.rom}</li>
                    <li>Screen Size: {curItem.details.screen}</li>
                    <li>Price: {curItem.details.price}</li>
                  </ul>
                </div>
              </div>
              <div className="existing-device-details-box-foot">
                <button
                  className="button1"
                  style={{ margin: "5px 0px" }}
                  onClick={() => {
                    handleUpdateImg();
                  }}
                >
                  Update
                </button>
                <button className="button2" style={{ margin: "5px 0px" }}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
