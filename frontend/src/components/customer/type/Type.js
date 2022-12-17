import React, { useEffect, useState } from "react";
import "./type.css";
import { useSelector } from "react-redux";
import laptopposter from "../../../images/laptopposter.jpg";
import tabletposter from "../../../images/tabletposter.jpg";
import mobileposter from "../../../images/mobileposter.jpg";
import TypeProduct from "./TypeProduct";
import { Navigate } from "react-router-dom";
import { getBrandsList } from "../../../api";
import LoadingCard from "./LoadingCard";

export default function Type() {
  var alldata = useSelector((state) => state.product);
  const type = window.location.href.split("/")[3];
  const [data, setData] = useState();

  useEffect(() => {
    fetchBrands();
    if (type === "mobiles") {
      setData(alldata.allMobiles);
      // setBFData(alldata.allMobiles);
    } else if (type === "laptops") {
      setData(alldata.allLaptops);
      // setBFData(alldata.allLaptops);
    } else if (type === "tablets") {
      setData(alldata.allTablets);
      // setBFData(alldata.allTablets);
    }
  }, [alldata]);
  const [brands, setBrands] = useState([]);
  async function fetchBrands() {
    const res = await getBrandsList(type);
    setBrands(res);
  }

  const priceFilterOptions = [
    "<50000",
    "50000 - 100000",
    "100000 - 150000",
    ">150000",
  ];

  const discountFilterOptions = ["<10%", "10% - 20%", "20% - 50%", ">50%"];

  const sortVal = [
    "Price(asc)",
    "Price(dsc)",
    "RAM(asc)",
    "RAM(dsc)",
    "Internal Storage(asc)",
    "Internal Storage(dsc)",
    "Dicount(asc)",
    "Discount(dsc)",
  ];

  function handleFilter() {
    const brandFilter = document.querySelector(
      "input[name='brandFilter']:checked"
    );
    if (brandFilter && brandFilter.value) {
      if (type === "mobiles") {
        setData(
          alldata.allMobiles.filter((item) => item.brand === brandFilter.value)
        );
        priceFilterFunc(
          alldata.allMobiles.filter((item) => item.brand === brandFilter.value)
        );
      } else if (type === "laptops") {
        setData(
          alldata.allLaptops.filter((item) => item.brand === brandFilter.value)
        );
        priceFilterFunc(
          alldata.allLaptops.filter((item) => item.brand === brandFilter.value)
        );
      } else if (type === "tablets") {
        setData(
          alldata.allTablets.filter((item) => item.brand === brandFilter.value)
        );
        priceFilterFunc(
          alldata.allTablets.filter((item) => item.brand === brandFilter.value)
        );
      }
    } else {
      if (type === "mobiles") {
        priceFilterFunc(alldata.allMobiles);
      } else if (type === "laptops") {
        priceFilterFunc(alldata.allLaptops);
      } else if (type === "tablets") {
        priceFilterFunc(alldata.allTablets);
      }
    }
  }

  function priceFilterFunc(fdata) {
    const priceFilter = document.querySelector(
      "input[name='priceFilter']:checked"
    );
    if (priceFilter && priceFilter.value) {
      if (priceFilter.value === "<50000") {
        setData(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) <= 50000
          )
        );
        discountFilterFunc(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) <= 50000
          )
        );
      } else if (priceFilter.value === "50000 - 100000") {
        setData(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) >= 50000 &&
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) <= 100000
          )
        );
        discountFilterFunc(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) >= 50000 &&
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) <= 100000
          )
        );
      } else if (priceFilter.value === "100000 - 150000") {
        setData(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) >= 100000 &&
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) <= 150000
          )
        );
        discountFilterFunc(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) >= 100000 &&
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) <= 150000
          )
        );
      } else if (priceFilter.value === ">150000") {
        setData(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) >= 150000
          )
        );
        discountFilterFunc(
          fdata.filter(
            (item) =>
              Math.floor(
                (item.details.price * (100 - item.details.discount)) / 100
              ) >= 150000
          )
        );
      }
    } else {
      discountFilterFunc(fdata);
    }
  }

  function discountFilterFunc(fdata) {
    const discountFilter = document.querySelector(
      "input[name='discountFilter']:checked"
    );
    if (discountFilter && discountFilter.value) {
      if (discountFilter.value === "<10%") {
        setData(fdata.filter((item) => item.details.discount <= 10));
      } else if (discountFilter.value === "10% - 20%") {
        setData(
          fdata.filter(
            (item) => item.details.discount <= 20 && item.details.discount >= 10
          )
        );
      } else if (discountFilter.value === "20% - 50%") {
        setData(
          fdata.filter(
            (item) => item.details.discount <= 50 && item.details.discount >= 20
          )
        );
      } else if (discountFilter.value === ">50%") {
        setData(fdata.filter((item) => item.details.discount >= 50));
      }
    } else {
      setData(fdata);
    }
  }
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  // ---------------------------------------------------------------------------------------

  return type != "mobiles" && type != "laptops" && type != "tablets" ? (
    <Navigate to="/" />
  ) : (
    <div className="type">
      <div className="type-filter" style={{ position: "relative" }}>
        <div
          style={{
            position: "fixed",
            overflow: "scroll",
            width: "200px",
            height: "calc(100vh - 40px)",
            padding: "20px 0px",
          }}
        >
          <div className="filter-head">Filters</div>
          <div className="filter-title">
            Brands{" "}
            <button
              onClick={() => {
                document.querySelector(
                  "input[name='brandFilter']:checked"
                ).checked = false;
                setTimeout(() => {
                  handleFilter();
                }, 100);
              }}
            >
              clear
            </button>
          </div>
          <div className="filter-options" style={{ minHeight: "90px" }}>
            {brands.map((item) => (
              <div key={item._id} className="filter-option">
                <input
                  type="radio"
                  value={item.name}
                  id={`${item.name}filter`}
                  name="brandFilter"
                  onChange={() => {
                    // handleBrandFilter(item.name);
                    handleFilter();
                  }}
                />
                <label htmlFor={`${item.name}filter`}>{item.name}</label>
              </div>
            ))}
          </div>
          <br />
          <div className="filter-title">
            Price
            <button
              onClick={() => {
                document.querySelector(
                  "input[name='priceFilter']:checked"
                ).checked = false;
                setTimeout(() => {
                  handleFilter();
                }, 100);
              }}
            >
              clear
            </button>
          </div>
          <div className="filter-options">
            {priceFilterOptions.map((item) => (
              <div className="filter-option" key={item}>
                <input
                  id={`${item}filter`}
                  type="radio"
                  value={item}
                  name="priceFilter"
                  onChange={() => {
                    // handlePriceFilter(item);
                    handleFilter();
                  }}
                />
                <label htmlFor={`${item}filter`}>{item}</label>
              </div>
            ))}
          </div>
          <br />
          <div className="filter-title">
            Discount
            <button
              onClick={() => {
                document.querySelector(
                  "input[name='discountFilter']:checked"
                ).checked = false;
                setTimeout(() => {
                  handleFilter();
                }, 100);
              }}
            >
              clear
            </button>
          </div>
          <div className="filter-options">
            {discountFilterOptions.map((item) => (
              <div className="filter-option" key={item}>
                <input
                  type="radio"
                  id={`${item}discountFilter`}
                  value={item}
                  name="discountFilter"
                  onChange={() => {
                    handleFilter();
                  }}
                />
                <label htmlFor={`${item}discountFilter`}>{item}</label>
              </div>
            ))}
          </div>
          <br />
          {/* <div className="filter-head">Sort By</div>
          <div className="filter-options">
            {sortVal.map((item) => (
              <div className="filter-option" key={item}>
                <input type="radio" value={item} name="sortOption" />
                <label>{item}</label>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <div className="type-body">
        <div>
          <img
            src={
              type == "laptops"
                ? "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Laptops/Revamp/D54261251_IN_PC_Laptops_PageRevamp_BAU_HEDDER_2.jpg"
                : type == "tablets"
                ? "https://images-eu.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/31/img22/samsung/dec22/TabS8_Amazon_1500x300_.jpg"
                : "https://images-eu.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/31/img21/Wireless/vinambia/SUD-Dec/1_Header_PC.jpg"
            }
            style={{ width: "100%" }}
          ></img>
        </div>
        {data &&
          data.map((item) => (
            <TypeProduct key={item._id} item={item} type={type} />
          ))}
        {!data && arr.map((item) => <LoadingCard />)}
      </div>
    </div>
  );
}
