import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addDelAddress, getCustomer } from "../../../api/index";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../../redux/actions/updateCustomer";

export default function Delivery() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);
  const [addressList, setAddressList] = useState(true);
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 500);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [type, setType] = useState("");

  async function handleAddress() {
    const res = await addDelAddress(customer.id, {
      data: {
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        type: type,
      },
    });
    const res2 = await getCustomer(customer.id);
    dispatch(updateCustomer(res2.data));
    if (res.success) {
      setAddressList(true);
    }
  }

  return !customer.id && !loader ? (
    <Navigate to="/authenticate" />
  ) : (
    <div className="account">
      <div className="account-box" style={{ marginTop: "20px" }}>
        {addressList && (
          <>
            <div className="account-head">Delivery Address</div>
            <div className="account-body">
              {!customer.address && (
                <div className="no-address-box">No address added</div>
              )}
              {customer.address &&
                customer.address.map((item) => (
                  <div className="address-body-item" key={item._id}>
                    <b>{item.type}</b> - {item.address}
                    <br />
                    {item.city}, {item.state} ({item.pincode})
                  </div>
                ))}
              <button
                className="new-address-btn"
                onClick={() => {
                  setAddressList(false);
                }}
              >
                Add a new Address
              </button>
            </div>
          </>
        )}
        {!addressList && (
          <>
            <div className="account-head">Add new address</div>
            <div className="account-body">
              <form>
                <label>Address</label>
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
                <span className="error-msg"></span>
                <label>City</label>
                <input
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                ></input>
                <span className="error-msg"></span>
                <label>State</label>
                <input
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                ></input>
                <span className="error-msg"></span>
                <label>Pincode</label>
                <input
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                ></input>
                <span className="error-msg"></span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 0px",
                  }}
                >
                  <label>Type</label>
                  <div>
                    <label
                      id="home-del"
                      className="del-type-opt"
                      onClick={() => {
                        setType("Home");
                        document
                          .getElementById("home-del")
                          .classList.add("del-type-opt-check");
                        document
                          .getElementById("work-del")
                          .classList.remove("del-type-opt-check");
                        document
                          .getElementById("other-del")
                          .classList.remove("del-type-opt-check");
                      }}
                    >
                      Home
                    </label>
                    <label
                      id="work-del"
                      className="del-type-opt"
                      onClick={() => {
                        setType("Work");
                        document
                          .getElementById("home-del")
                          .classList.remove("del-type-opt-check");
                        document
                          .getElementById("work-del")
                          .classList.add("del-type-opt-check");
                        document
                          .getElementById("other-del")
                          .classList.remove("del-type-opt-check");
                      }}
                    >
                      Work
                    </label>
                    <label
                      id="other-del"
                      className="del-type-opt"
                      onClick={() => {
                        setType("Other");
                        document
                          .getElementById("home-del")
                          .classList.remove("del-type-opt-check");
                        document
                          .getElementById("work-del")
                          .classList.remove("del-type-opt-check");
                        document
                          .getElementById("other-del")
                          .classList.add("del-type-opt-check");
                      }}
                    >
                      Other
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Add"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddress();
                  }}
                ></input>
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => {
                    setAddressList(true);
                  }}
                ></input>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
