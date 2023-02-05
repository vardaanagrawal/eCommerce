import React, { useEffect, useState } from "react";
import "./newDevice.css";

//----------------------------------------------------------------------------------------------------------
import {
  postProductBrand,
  getProductBrand,
  postProductImg,
  postProduct,
} from "../../api/index";
//----------------------------------------------------------------------------------------------------------

export default function NewDevice({ device }) {
  const [deviceType, setDeviceType] = useState(device);

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [headError, setHeadError] = useState();

  const [newDeviceBrand, setNewDeviceBrand] = useState(""); //variable for the new brand form
  const [deviceBrandList, setDeviceBrandList] = useState([]); //list of all available brands

  //variables for the details of the new device to be added
  const [newDeviceBrandName, setNewDeviceBrandName] = useState();
  const [newDeviceName, setNewDeviceName] = useState();
  const [ram, setRAM] = useState();
  const [rom, setROM] = useState();
  const [cpu, setCPU] = useState();
  const [screen, setScreen] = useState();
  const [price, setPrice] = useState();
  const [deviceImg, setDeviceImg] = useState();
  const [deviceImgPrev, setDeviceImgPrev] = useState();

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  async function fetchDeviceBrands() {
    const res = await getProductBrand(deviceType);
    setDeviceBrandList(res.data.brand);
  }

  useEffect(() => {
    fetchDeviceBrands();
  }, []);

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  function openNewDeviceBrandForm() {
    setNewDeviceBrand("");
    setErrormsg("");
    setLoader2(false);
    document.querySelector(".new-device-brand-form").style.display = "block";
    setTimeout(() => {
      document.querySelector(".new-device-brand-form form").style.right =
        "10px";
    }, 100);
  }
  function closeNewDeviceBrandForm() {
    document.querySelector(".new-device-brand-form form").style.right =
      "-410px";
    setTimeout(() => {
      document.querySelector(".new-device-brand-form").style.display = "none";
    }, 300);
  }
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  async function handleNewDeviceBrand() {
    if (!newDeviceBrand) {
      document.querySelector(".errormsgbox").style.display = "block";
      setErrormsg("*required");
    } else {
      setLoader2(true);
      const res = await postProductBrand(deviceType, newDeviceBrand);
      if (!res.data.success) {
        document.querySelector(".errormsgbox").style.display = "block";
        setErrormsg(res.data.message);
      } else {
        fetchDeviceBrands();
        closeNewDeviceBrandForm();
      }
      setLoader2(false);
    }
  }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  async function handlePostDevice() {
    if (!newDeviceBrandName) {
      setHeadError("Please select a brand");
    } else if (!newDeviceName) {
      setHeadError("Please enter the name");
    } else if (!cpu || !ram || !rom || !price || !screen) {
      setHeadError("Please enter description");
    } else if (!deviceImg) {
      setHeadError("please select a pic");
    } else {
      setLoader1(true);
      //posting device image to cloudinary
      const formData = new FormData();
      formData.append("file", deviceImg);
      formData.append("upload_preset", "hddvzsci");
      formData.append("folder", "devices");
      const res = await postProductImg(formData); // res -> response after posting device image to cloudinary
      //posting device to mongodb
      const res2 = await postProduct(
        deviceType,
        newDeviceBrandName,
        newDeviceName,
        {
          cpu: cpu,
          ram: ram,
          rom: rom,
          screen: screen,
          price: price,
        },
        res.data.secure_url
      );
      alert(res2.data.message);
      setLoader1(false);
    }
  }

  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  return (
    <div className="new-device">
      <div className="new-device-head">
        <h2>Enter the details of {deviceType}</h2>
        <div
          className="head-error"
          style={{ fontWeight: "bolder", color: "red" }}
        >
          {headError}
        </div>
        <button
          className="button1"
          onClick={() => {
            handlePostDevice();
          }}
        >
          {loader1 ? <div className="loader"></div> : "Save"}
        </button>
      </div>
      {/**--------------------------------------------------- */}
      <div className="new-device-body">
        <div>
          <div className="new-device-brand">
            <div className="new-device-brand-head">
              <div>Select a brand</div>
              <button
                className="button1"
                onClick={() => {
                  openNewDeviceBrandForm();
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="new-device-brand-body">
              <select
                onChange={(e) => {
                  if (e.target.value == "Select a brand") {
                    setNewDeviceBrandName();
                  } else {
                    setNewDeviceBrandName(e.target.value);
                  }
                }}
              >
                <option>Select a brand</option>
                {deviceBrandList.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="new-device-name">
            <div className="new-device-name-head">Enter name of the device</div>
            <input
              type="text"
              placeholder="Name of the device"
              value={newDeviceName}
              onChange={(e) => {
                setNewDeviceName(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div>
          <div className="new-device-desc">
            <div className="new-device-desc-head">
              Enter description of the device
            </div>
            <div className="new-device-desc-body">
              <input
                type="text"
                placeholder="CPU"
                value={cpu}
                onChange={(e) => {
                  setCPU(e.target.value);
                }}
              ></input>
              <input
                type="text"
                placeholder="RAM"
                value={ram}
                onChange={(e) => {
                  setRAM(e.target.value);
                }}
              ></input>
              <input
                type="text"
                placeholder="ROM"
                value={rom}
                onChange={(e) => {
                  setROM(e.target.value);
                }}
              ></input>
              <input
                type="text"
                placeholder="Screen Size"
                value={screen}
                onChange={(e) => {
                  setScreen(e.target.value);
                }}
              ></input>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <div className="new-device-img">
            <div className="new-device-img-head">
              <div>Select an image</div>
              <label
                htmlFor="device-img"
                className="button1"
                style={{ fontSize: "medium", padding: "8px 20px" }}
              >
                Browse
              </label>
              <input
                type="file"
                id="device-img"
                onChange={(e) => {
                  setDeviceImg(e.target.files[0]);
                  setDeviceImgPrev(URL.createObjectURL(e.target.files[0]));
                }}
                style={{ display: "none" }}
              ></input>
            </div>
            <div className="new-device-img-body">
              <div className="new-device-img-prev">
                <img
                  src={deviceImgPrev}
                  alt=""
                  style={{ height: "100%", width: "100%" }}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**--------------------------------------------------- */}
      <div className="new-device-brand-form">
        <form>
          <label>Add a new device brand</label>
          <input
            type="text"
            placeholder="Name of the brand"
            value={newDeviceBrand}
            onChange={(e) => {
              setNewDeviceBrand(e.target.value);
            }}
            required
          ></input>
          <div
            className="errormsgbox"
            style={{ color: "red", fontWeight: "bolder", display: "none" }}
          >
            {errormsg}
          </div>
          <button
            className="button1"
            onClick={(e) => {
              e.preventDefault();
              handleNewDeviceBrand();
            }}
            style={{
              position: "absolute",
              bottom: "80px",
              width: "380px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loader2 ? <div className="loader"></div> : "Add"}
          </button>
          <button
            className="button2"
            onClick={(e) => {
              e.preventDefault();
              closeNewDeviceBrandForm();
            }}
            style={{ position: "absolute", bottom: "20px", width: "380px" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
