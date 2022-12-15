import React, { useState } from "react";
import "./account.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomerName,
  updateCustomerPassword,
  deleteCustomer,
} from "../../../api";
import { updateCustomer as customerAction } from "../../../redux/actions/updateCustomer";
import { Navigate } from "react-router-dom";

export default function Account() {
  const customer = useSelector((state) => state.customer.customer);
  const [editName, setEditName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = useState("");
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [nameErrorMsg, setnameErrorMsg] = useState("");
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  const dispatch = useDispatch();
  async function handleNameUpdate() {
    const res = await updateCustomerName(customer.id, name);
    dispatch(customerAction(res.data));
    setEditName(false);
    setName("");
  }

  async function handlePasswordUpdate() {
    const res = await updateCustomerPassword(
      customer.id,
      oldPassword,
      newPassword
    );
    if (res.success) {
      setNewPassword("");
      setOldPassword("");
      setEditPassword(false);
    } else {
      setOldPasswordErrorMsg("Incorrect old password");
    }
  }
  function handleSignout() {
    if (window.confirm("Are you sure?")) {
      window.localStorage.removeItem("customer");
      window.location.href = "/";
      dispatch(customerAction({}));
    }
  }
  async function handleDeleteAccount() {
    if (window.confirm("Are you sure?")) {
      const res = await deleteCustomer(customer.id);
      window.localStorage.removeItem("customer");
      window.location.href = "/";
      dispatch(customerAction({}));
    }
  }

  return !customer.id && !loader ? (
    <Navigate to="/authenticate" />
  ) : (
    <div className="account">
      {!editName && !editPassword && (
        <div className="account-box">
          <div className="account-head">My Account</div>
          <div className="account-body">
            <div className="account-name">
              <div>
                <div className="account-title">Name:</div>
                {customer.name}
              </div>

              <button
                className="account-edit-btn"
                onClick={() => {
                  setEditName(true);
                }}
              >
                Edit
              </button>
            </div>
            <div className="account-email">
              <div>
                <div className="account-title">Email:</div>
                {customer.email}
              </div>
            </div>
            <div className="account-name">
              <div>
                <div className="account-title">Password:</div>
                ********
              </div>
              <button
                className="account-edit-btn"
                onClick={() => {
                  setEditPassword(true);
                }}
              >
                Edit
              </button>
            </div>
            <div className="account-btns">
              <button
                onClick={() => {
                  handleSignout();
                }}
                className="signout-btn"
              >
                Sign Out
              </button>
              <button
                className="delete-account-btn"
                onClick={() => {
                  handleDeleteAccount();
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      {editName && (
        <div className="account-box">
          <div className="account-head">Update Name</div>
          <div className="account-body">
            <form>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <label className="error-msg">{nameErrorMsg}</label>
              <br />
              <input
                type="submit"
                value="Update"
                onClick={(e) => {
                  e.preventDefault();
                  handleNameUpdate();
                }}
              ></input>
              <input
                type="button"
                value="Cancel"
                onClick={() => {
                  setEditName(false);
                }}
              ></input>
            </form>
          </div>
        </div>
      )}
      {editPassword && (
        <div className="account-box">
          <div className="account-head">Update Password</div>
          <div className="account-body">
            <form>
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              ></input>
              <label className="error-msg">{oldPasswordErrorMsg}</label>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              ></input>
              <label className="error-msg">{newPasswordErrorMsg}</label>
              <br />
              <input
                type="submit"
                value="Update"
                onClick={(e) => {
                  e.preventDefault();
                  handlePasswordUpdate();
                }}
              ></input>
              <input
                type="button"
                value="Cancel"
                onClick={() => {
                  setEditPassword(false);
                }}
              ></input>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
