import React, { useEffect, useState } from "react";
import "./auth.css";
import { sendOTP, signup, login } from "../../api/index";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../redux/actions/authenticate";

export default function Auth() {
  const [authType, setAuthType] = useState("SIGNUP");

  return (
    <div className="auth">
      {authType == "SIGNUP" && <Signup setAuthType={setAuthType} />}
      {authType == "LOGIN" && <Login setAuthType={setAuthType} />}
      {authType == "SEND_OTP" && <Otp setAuthType={setAuthType} />}
    </div>
  );
}
//----------------------------------------------------------------------------------------
function Signup({ setAuthType }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  async function handleSignup() {
    setLoader(true);
    if (validateForm()) {
      const res = await sendOTP({ email: email });
      if (res.success) {
        dispatch(
          authenticate({
            otpID: res.otpID,
            email: email,
            name: name,
            password: password,
          })
        );
        setAuthType("SEND_OTP");
      } else {
        alert(res.message);
      }
    }
    setLoader(false);
  }

  function validateForm() {
    if (!name) {
      setNameErr("*required");
      return false;
    } else if (!email) {
      setEmailErr("*required");
      return false;
    } else if (!password) {
      setPasswordErr("*required");
      return false;
    } else if (!ValidateEmail(email)) {
      setEmailErr("*incorrect format");
      return false;
    } else if (password.length < 8) {
      setPasswordErr("*must be atleast 8 characters");
      return false;
    } else {
      return true;
    }
  }
  function ValidateEmail(email) {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      return false;
    }
    return true;
  }

  return (
    <div className="auth-form">
      <div className="auth-form-head">Create Account</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameErr("");
          }}
        ></input>
        <label className="error-msg">{nameErr}</label>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr("");
          }}
        ></input>
        <label className="error-msg">{emailErr}</label>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordErr("");
          }}
        ></input>
        <label className="error-msg">{passwordErr}</label>
        {!loader && <input type="submit" value="Continue"></input>}
        {loader && (
          <div
            className="auth-loader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        )}
        <input
          type="button"
          onClick={() => {
            setAuthType("LOGIN");
          }}
          value="Already have an account? Log In"
        ></input>
      </form>
    </div>
  );
}
//----------------------------------------------------------------------------------------
function Login({ setAuthType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loader, setLoader] = useState(false);

  async function handleLogin() {
    setLoader(true);
    if (!email) {
      setEmailErr("*required");
    } else if (!ValidateEmail(email)) {
      setEmailErr("*incorrect format");
      return false;
    } else if (!password) {
      setPasswordErr("*required");
    } else if (password.length < 8) {
      setPasswordErr("*must be atleast 8 characters");
    } else {
      const logindata = {
        email: email,
        password: password,
      };
      const res = await login(logindata);
      if (res.success) {
        window.localStorage.setItem("customer", res.userId);
        window.location.href = "/";
      } else {
        alert(res.message);
      }
    }
    setLoader(false);
  }
  function ValidateEmail(email) {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= email.length
    ) {
      return false;
    }
    return true;
  }

  return (
    <div className="auth-form">
      <div className="auth-form-head">Log In</div>
      <form>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr("");
          }}
        ></input>
        <label className="error-msg">{emailErr}</label>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordErr("");
          }}
        ></input>
        <label className="error-msg">{passwordErr}</label>

        {!loader && (
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            value="Continue"
          ></input>
        )}
        {loader && (
          <div
            className="auth-loader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        )}
        <input
          type="button"
          onClick={() => {
            setAuthType("SIGNUP");
          }}
          value="Don't have an account? Sign up"
        ></input>
      </form>
    </div>
  );
}
//----------------------------------------------------------------------------------------
function Otp({ setAuthType }) {
  const authData = useSelector((state) => state.auth.authResponse);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [loader, setLoader] = useState(false);

  async function handleOTP() {
    setLoader(true);
    if (!otp) {
      setOtpErr("*required");
    } else if (otp.length != 6) {
      setOtpErr("*must be 6 digit");
    } else {
      const data = {
        otp: otp,
        otpID: authData.otpID,
        userData: {
          name: authData.name,
          email: authData.email,
          password: authData.password,
        },
      };
      const res = await signup(data);
      if (res.success) {
        window.localStorage.setItem("customer", res.userId);
        window.location.href = "/";
      } else {
        alert(res.message);
      }
    }
    setLoader(false);
  }

  return (
    <div className="auth-form">
      <div className="auth-form-head">Enter OTP</div>
      <form>
        <label>Please enter OTP sent to</label>
        <label style={{ color: "goldenrod" }}>{authData.email}</label>
        <input
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setOtpErr("");
          }}
        ></input>
        <label className="error-msg">{otpErr}</label>
        {!loader && (
          <input
            type="submit"
            value="Continue"
            onClick={(e) => {
              e.preventDefault();
              handleOTP();
            }}
          ></input>
        )}
        {loader && (
          <div
            className="auth-loader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        )}
        <input
          type="button"
          value="Change Email"
          onClick={() => {
            setAuthType("SIGNUP");
          }}
        ></input>
      </form>
    </div>
  );
}
