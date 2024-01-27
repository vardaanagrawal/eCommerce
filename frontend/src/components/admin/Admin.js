import React, { useState } from "react";
import "./admin.css";

import NewDevice from "./NewDevice";
import ExistingDevice from "./ExistinDevice";

export default function Admin() {
  const [category, setCategory] = useState("");
  const [action, setAction] = useState("existing");

  function handleOpenCategory(item) {
    setCategory(item);
    const m = document.querySelector(".admin-Mobile").style;
    const l = document.querySelector(".admin-Laptop").style;
    const t = document.querySelector(".admin-Tablet").style;
    m.left = l.left = t.left = "42px";
    m.top = l.top = t.top = "30px";
    m.height = l.height = t.height = "100px";
    m.width = l.width = t.width = "100px";
    m.display = l.display = t.display = "none";
    if (item == "Mobile") {
      m.display = "block";
    } else if (item == "Laptop") {
      l.display = "block";
    } else if (item == "Tablet") {
      t.display = "block";
    }
    setTimeout(() => {
      document.querySelector(".admin-box").style.display = "flex";
      document.querySelector(".admin-action-btns").style.display = "block";
      document.querySelector(".back-to-category").style.display = "flex";
    }, 300);
  }
  function handleBackToCategory() {
    setCategory("");
    const m = document.querySelector(".admin-Mobile").style;
    const l = document.querySelector(".admin-Laptop").style;
    const t = document.querySelector(".admin-Tablet").style;
    document.querySelector(".back-to-category").style.display = "none";
    document.querySelector(".admin-box").style.display = "none";
    document.querySelector(".admin-action-btns").style.display = "none";
    m.display = "block";
    l.display = "block";
    t.display = "block";

    setTimeout(() => {
      m.height = l.height = t.height = "300px";
      m.width = l.width = t.width = "300px";
      m.left = "calc(50vw - 480px)";
      m.top = "calc(50% - 150px)";
      l.left = "calc(50vw - 150px)";
      l.top = "calc(50% - 150px)";
      t.left = "calc(50vw + 180px)";
      t.top = "calc(50% - 150px)";
    }, 10);
  }

  const categoryList = [
    {
      name: "Mobile",
      img: "https://res.cloudinary.com/dg1awjvew/image/upload/v1670306752/devices/lta82diahloq6imb69u9.jpg",
    },
    {
      name: "Laptop",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5QxU8owYJOOSgeAk_Y5eJPWFtsJGxnyJnA&usqp=CAU",
    },
    {
      name: "Tablet",
      img: "https://m.media-amazon.com/images/I/81hAx31maUL._SL1500_.jpg",
    },
  ];
  return (
    <div className="admin">
      <div className="admin-head">eCommerce</div>
      <div className="admin-body">
        {categoryList.map((item) => (
          <div
            className={`admin-${item.name}`}
            onClick={() => {
              handleOpenCategory(item.name);
            }}
            key={item.name}
            style={{display: "flex", alignItems: "center", justifyContent: "center"}}
          >
            <img
              src={item.img}
              style={{ height: "50%", width: "auto", borderRadius: "0" }}
            ></img>
          </div>
        ))}
        <div className="admin-action-btns">
          <div
            className="add-new-btn"
            onClick={() => {
              setAction("new");
            }}
          >
            Add New
          </div>
          <div
            className="existing-list-btn"
            onClick={() => {
              setAction("existing");
            }}
          >
            Existing Items
          </div>
        </div>
        <div className="admin-box">
          {category && action == "new" && <NewDevice device={category} />}
          {category && action == "existing" && (
            <ExistingDevice device={category} />
          )}
        </div>
        <div
          className="back-to-category"
          onClick={() => {
            setAction("existing");
            handleBackToCategory();
          }}
        >
          {"<- Categories"}
        </div>
      </div>
    </div>
  );
}
