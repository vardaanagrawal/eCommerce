import React, { useState, useEffect } from "react";
import "./navbar.css";
import "./cart.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, removeItemFromCart, getCart } from "../../../api";
import { updateCart as updateCartRedux } from "../../../redux/actions/updateCart";

export default function Navbar() {
  const customer = useSelector((state) => state.customer.customer);
  const [cart, setCart] = useState(false);
  const [profile, setProfile] = useState(false);
  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">LOGO</div>
      </Link>
      {/* <div className="searchbar">
        <input
          placeholder="Search for products"
          className="searchbar-input"
        ></input>
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div> */}
      <div className="nav-menu">
        <div
          className="nav-cart-btn"
          onClick={() => {
            setCart(true);
          }}
        >
          Cart
        </div>
        {!customer.id && (
          <Link to="/authenticate">
            <button className="nav-signin-btn">Sign in</button>
          </Link>
        )}
        {customer.id && (
          <div
            className="nav-profile-btn"
            onClick={() => {
              setProfile(true);
            }}
          >
            {customer.name.split(" ")[0]}
          </div>
        )}
      </div>
      {cart && <Cart setCart={setCart} />}
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
}

function Cart({ setCart }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".cart-box").style.right = "0px";
    }, 10);
  }, []);

  function closeCart(e) {
    if (e.target.className == "cart" && e.target.className != "cart-box") {
      document.querySelector(".cart-box").style.right = "-400px";
      setTimeout(() => {
        setCart(false);
      }, 300);
    }
  }
  const customer = useSelector((state) => state.customer.customer);
  const cart = useSelector((state) => state.customer.cart);
  var totalPrice = 0;
  var productCount = 0;
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      totalPrice =
        totalPrice +
        parseInt(
          (cart[i].device.details.price *
            (100 - cart[i].device.details.discount)) /
            100
        ) *
          cart[i].qty;
      productCount = productCount + cart[i].qty;
    }
  }
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  async function handleUpdateCart(type, id, qty) {
    setLoader(true);
    const res = await updateCart(type, id, customer.id, qty);
    dispatch(updateCartRedux(res.cart));
    setLoader(false);
  }

  async function handleRemoveItem(id) {
    const res = await removeItemFromCart(customer.id, id);
    const cart = await getCart(customer.id);
    dispatch(updateCartRedux(cart));
  }

  return (
    <div
      className="cart"
      onClick={(e) => {
        closeCart(e);
      }}
    >
      <div className="cart-box">
        <div className="cart-box-head">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>Cart</div>
            <div
              style={{
                fontSize: "medium",
                backgroundColor: "goldenrod",
                width: "40px",
                textAlign: "center",
                height: "40px",
                borderRadius: "50%",
                lineHeight: "40px",
                marginLeft: "10px",
                color: "white",
              }}
            >
              {productCount}
            </div>
          </div>
          <div> &#8377;{totalPrice}</div>
        </div>
        {customer.id && (!cart || !cart.length) && (
          <div className="cart-box2">
            <div className="cart-body">
              <div className="cart-body-img">
                <img src="data:image/png;base64,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"></img>
              </div>
              <div className="cart-body-message">Your cart is empty</div>
            </div>
            <div className="cart-foot">
              <button
                className="button3"
                onClick={(e) => {
                  document.querySelector(".cart-box").style.right = "-400px";
                  setTimeout(() => {
                    setCart(false);
                  }, 300);
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
        {cart && (
          <div className="full-cart-body">
            {cart.map((item) => (
              <div key={item.device._id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.device.img}></img>
                </div>
                <div
                  className="cart-item-info"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span style={{ fontWeight: "600" }}>{item.device.name}</span>
                  <span style={{ color: "grey", marginTop: "-2px" }}>
                    {item.device.brand}
                  </span>
                  <span style={{ fontSize: "large", marginTop: "5px" }}>
                    &#8377;
                    {Math.floor(
                      (item.device.details.price *
                        (100 - item.device.details.discount)) /
                        100
                    )}
                  </span>
                </div>
                <div className="cart-item-qty">
                  <div className="cart-item-qty-head">qty:</div>
                  <div className="cart-item-qty-body">
                    <button
                      disabled={loader}
                      className="cart-qty-btn"
                      onClick={() => {
                        handleUpdateCart(
                          item.type,
                          item.device._id,
                          item.qty - 1
                        );
                      }}
                    >
                      -
                    </button>
                    {item.qty}
                    <button
                      disabled={loader}
                      className="cart-qty-btn"
                      onClick={() => {
                        handleUpdateCart(
                          item.type,
                          item.device._id,
                          item.qty + 1
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-qty-foot">
                    <button
                      onClick={() => {
                        handleRemoveItem(item.device._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!customer.id && (
          <div className="cart-box2">
            <div className="cart-body">
              <div className="cart-body-img">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADXCAMAAADMbFYxAAACqVBMVEX/////waAcptR2KBIiSWbJycmZ1+zg4OD8/PzsOjpGnx/l5eX8////qnH/w6L/wJ/bspT29vbw8PD/wgDQ0NBaWlr39/fV1dX5S0yVlZVoAAClExNcXFz/x6X+v5tvFgiKOtH3QUDAwMCurq6KzmsAtsrglGzsn4P3XYm+7PKZAABlAABvHQDzsYz/l5j88+z/5ie1tbVIPj90dHQqKipMTExwGACGTT/CrKXusZPeoIHXycj7077728n6z7P77uV4w9372sg8nAD7xdcLo9Q7lhrVvq161uOn5+sAOVucfcaRkZEhISFoaGjsKiqhoaGxlIyUYVerjITApqClfHLPvbp8MyKYa2GDRjWSTTewdFeiY0zSl3vEhmqvclyORSyrhHKPYkyreWDAe17Oq5r7pZnnvah6ODT8n5iJUk2AMSd6EgC0T0HRZVecPC/gc2HplX3g8fI+sdaMusayztQAbZWEy+GAr8P8oF3VgE4OirLAloA1hpt9l6D81uFxW1T3nLr7vdD8dp3pfqLI4L5krER8tWXsN3X9tH/k8Nyjy5Tf1eIAqr3Jek3ey69gsbzVuYPze33oxSv5vWJvr1bd5ZPyn73V1ij/1hn8rx76ojTHqbOVuyOZrZFyrhz64z/wxU7kyX+ywa/npaTMxJ+u23GBanL6ZmWNt37l2Zz8e2Hqa4Ce3Uv/JCK7Oi+v1Z+3vm+qtCij14lKsw/MeHK20z7X1176ZH6unFn24lj4ZS3cxwD3xDfo3HuvVVSfq2P+aT1fuibByZaInnDmbxzHbyZmv1EZX36ZW8KKvUiIQ8CDehwKHy/LUXzDiQ+srpRhkR24lDWPOcm4dI3VMVadtV+7pdC/AFmqkNXLeaD6igZidYmTBobKoLG9JXi+QppkAL6XaaemAD4khuQSAAAUnUlEQVR4nO2ci18TZ7rHE8KYgQwzZBgSQCaRhFKUxBBuJUxCuIlLEaJCbFVQ21pOu23dgpeturLWAipuqbh2teu23RJatLWiQrun1rprt0dtz7p7TrtVW8/29Oxfcp53ZnIlhHGFQPzMTz8kmQnh/ea5vu9cFApZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVB+GrtfA8hbmorWoNg8fkeRxykMaoqAFa7dr4HMtciFIp2i0pV8YiOK/LO92DmWBq1wqhSIdjKCkvlfI9mbrWGVucgVpUFAa9Rz/d45lD6Io7j7SrIkvOI94FNUW057aGsQGusaPc+mCVodUVFW4UqXBaj5TEvPd8jm31VGlXrVFOFcCsfNFx9pFFDcFXtD1imWmOZDhbSsmWtbr7HN4tSPxKDFVXdB8eRK40xUQH28QelBK3OiU0KMq6e70HOjioRqkW1XhXLuJZ2br7HOQvS8Dl4g4N1bIxFW5HzWOIHLaRgy+YqllSSrKNzfaygTfgMhXr+zQ5WiUSypKNj08bNUGYEVRgtIaauaJ/vwd6n0LS1ilT6RZIsq3RUdXQidVQ5HBTIITZVxsSe2uKAsJ4NoCpZkgRvFsSKj2SVaFzLmvke7n2Jq1BZOkLNSgZfBPg3+B05J6EjdjVkYQeyIQvZCaGyU1CV7MZAmU3oJQvIwutIkurYtOmpKoqMalaS2hzITgndUjwOTQTrUBUVFRmN6x1siDcjS/MvSYflgcjEtnUqyybWsX5DR1XnRlVn0IHJjg0bOqso3rGrAksWlsfme8D3IQ2Mv4Plcy7U1hCrOoqQqddtoEgl22l5IFjV0DTx1RWqaliokh1VVR0bVMZ1DpJ9KsiayD6MWMGc5NRiwxdY5aaijSy70fJA5CbEynswwE0tNmDuDrBrCGsi1xyIVxVKuCxFRWXlHTs4IchJ5Ikdvc6yGVKT48nHtnQYpqFVBsqrypjIfZNtnWU9JOAnMEKhbTRExisZ0UpYHk/kRbbqzZYNLPmkWqHzenWNVJDUgKY6wlQvpG1K5DSssz5l7GQdlQrdmpycdi0bgHU00oSWe6KDDWNN5HaYcFurEKuaqMxRPa7Q1IqsFEsTGq+X0D6B2gsykJssmvke8b8uwmW1qjpYB02shenOmkq3GLGUm+ByjDmPaNWbWDTNgcJkWb9eZUzo6SuwPtVBUrTCmwMFRe8SWKlqglhnUT2i0Cu2gKXJTotlAzRWbGdCL0u4rVargwQzEo9VVKwmqgUfppwEjVy2vV3RZuB7Y2FSQFbP93jvRzZgRZYDWL2acFFKvn8CVgId9MipVGxFlqY6xfpjcBPzPeL7EGm1GpQUZWCrndWkAUxYVYXaYxuhfjzH2E5o00mx1D5sRay18z3e+xEELPX08uXPUAYK+S9ZRZJo2kO6CJ1aQxC1YrIirQUFVlJpcIq/5jcvkUh2JlgrtRyJQkuIVKC+UmR1rcvJGsTJD1kACrK6XcKjzumav6Hfswib1QB2BcMqlZ1dLmc1SxqQSOTYSsoBMwIUzwbECj4sojkNOP+7rCGRWME2JApYVEWL/k3o7HGbzdWJstQzyOBPk4IL83Z182+AfI2SlI2k2MQ6VEk4Bcdl1xmNOe2cFicIHfds0WZWKTg38m6yqgDFqx/NRqKEDKiUDYxrm2eAe5HYLLEbcwC2qMj4U1VRUY5RxSrJpwN2LRBSk1hybBQ8cysNpFtbyxoSqejiYqqtKjIGlbMRIaJjOXxygtgFVJeYdd0UxTohjqudBgPF2hIoF/sLCwSs0Vjhhw1ZUxR83EAF8pBLiHCUvgzOxIpY3D+V2/jc8y+AthlzjCFH7oASZeZqd+AXqv2TeipkY4JIjFhojn6GWH/2/EZHyFEdg8vmcrlDPDXw3UDL4Xa7E8mH0dTOD0s+/OKLLz5MhRzqoFCUEkSwQbLVkoGOQ6jFiVVjFS6/V5IRh68oNtRLCZ2r2hBcqEHuTVa7FkTRkZ42CDcZihCwqdIV0vHiABq2/AbhulAc2JbGSn8z7jSE00LBYf0m03V329xOKuQd/DPIVwsEVeFIS7uHUCLc0OqD3cTTBpRUrRtHJET3opqehu0wDwpODAwkvBWhGxZIIsZfSks7dE/VD3e7nBR/LojV+rBD4edsSEpK6mFDSFmXDt5aiyYKpGFBRKsLWNPu+Wt/WJSV3L69picJOHsANamhS0zViBQX560EDpr9gf8LAhdOS7unZlXbvWOHQ0B1KMmdO5FBBdSkBrtBtKl7YdAJwoWEQSBU6dmJ2AVGbNizk+VRKZIid+5JCqrh58DKN08LJRvxqn6JXz2wIdTd6aF7cCvlmsYqS5P4sNyzs5Kl+BU21hPGmtQD01znQqkwAYlR6uLtGpqccNIKA45Gq61pEJF27qnkT+ciI1AhYKf7muZRyJ4G+P6dPOtLKE3iOlqjx0zpVnLvXkeUiFva40cFw+78xT6PZ98vIlCTGpbOB0xARH19L6+wrW6EaBNTE/9MbQbZTZyV/GV5eYkDFcVQWmJXQyjUHsDduXNPBGpSQ01c2SJFFIoK24p8dzc4cQE8Fux+VadQmDEaHTbVsVub7fbMLSzkGNYZ6O66exqSoih8Y0NDz6L4AwZF73/5lQNIhYWvCItifJuDfBeyky7Nb1eNB1fQaj0DMpns5Vv4w4yo9al1w1ewKBpoUiTorqVxzUp9/QNhLQpdWF8vmPXgwYO93bwQazWfkgRXTkNdoplR4IxeQ7tJ8pcl5SWBc0BgBq5kuYaoVg21b8+i7vimX93h1Lq6AZ1tcDzIeqAwwHrkIdCvdiBWPk4LcL5rQimZ9ugUGgb24LWsYe9eNGELTlYow8+DUA3Bp+Krnp6amkXdcQVV4AN1K1akpsKPujo/LO2P1sKDhaGsVhSvBTonYt396qs2O6ZQMOIxYp27FhWU6kAbTxm6/IA1oJ6A4MWuRYLim4BtfXWpAfUPokSDDzUGWA/U7z+y8jUQbwGr4LpdyJMPpRWoPVoFzYTkXQJHU5rA4QzDdsGcDX60qYon6um6/tQQ1Q3ArPno5YzhV5AOvFK4v35/L63X602KIKuTfwDYrbCVmXJBHGFzseK8m+yZiTWe0SoyrgjAKs4cO1mc8WsCh9r6MnGg8MCB3u4w1t27G9HDIYAFVhqL1vHg7mqSn4Q2NvC5dlrUuAbscYFyxYoVwpP+vteLMwD26f2/2d/7cv0BlIc1JrvJrFFDd1TA27WKfyjYXWA2mfTTXOdI6ITpub2hoaGme0Gw8sEqcIqmrUs9cfJk8cmMN37rz8OnmktKSspMJkyvFljT0ETd6kjfalKbmBgnYOE2t9u2aBfgROfcBQkrjgE7HubAqTz074ozioszMjLeKDyw/4CfdRWqLITDmt7V2NiIQevANTZ2MdAKS/krBCTeXYGYhad8VubrT88cA4bocEgSFlFTP0KsJwH2pfr6+oMHC99rLs32mM0Mg/GAXQ7MIdg2Ta/QSDopScdXVb/C2omeOCanvv7UN4/XBVHrQG9dePvtY7///TujHAd8DGb3ZDeXljLQKxbwTQQnuvIhWqGXdL5kd2QLHKI4BqwJ6+s73C/A9h8fGDj95giI4YaGzrzzjm/0Xebge+Vl4MMl5dzw2Fhe3guAyPEz9d279+oUUbPwFHVP3yvGczpnZ5hxuq8PAWLMyMibp08PDBw/fYb34Yz3PzjLHCwtR6glmd6s1g8//PDcoTQrdwipoGCrFmck/ZGlMVjjmJwwtQYb6eujx08PjI8gBwYT150XWS98cJ7ZUMqjlrR4s/JaW1vP7U3fyqWLctOSUlNM1pq55QuVHsNH8vMvHs4fye8bqfM3T37W1I6RiX2ZyLDlpeZnzy1evGzT3vTGIKu01BSLNZ6JWGNXYMA6Pj6eP6jvE/PxwCiqORkZw5PHsQ9WPsTrte3vIdYngbXRz2qTlppiz2PjdwMRnUehv5h/MX88/6JOP56f/xHKxR8LrMf+8Id/5w6KrCsF1k2hrDgjbUlsUax5bBwTsQdXX8xHGjnMXHy3uPjEhQsnPxlFLvzpl5cuvd+YBawrf7Lyoe2v+Vm5AKtJWmqKyRrPRGymNYM86+n8kc/f5psIYOXN+jvEegmxLv2JwHpu25atXRh0To0cCMMk3vRjVyy7xjERMxjWly8I+0xALX57CLF+CqwFje/D7HXHjh3bsR0mL8iE8e0hqL9/SC3xVO6aWPFaM5d04VKbTCPXeNTXz3xWfPLy5cuffPwZ886Z0aGREa8Xw7w7eL22w3fl+W3nFi/7aTrG++8fJ1KHJKam2Kxx7BI1dgYbHByHdmKIY4aQRkdHmXfOX3w3P//8n9JH/D6848qyxUjPbWGA9Oq3qXXffi4xNSl6YrHGMTlpzX2omRh//ZOPB0cugOsWwySHO3b27J/Pnj37xYtv/ofIanp+scD6LLAenfh2ov/qVYmpSRF9lVjQnniumJpx/eC1a9dOnPhoYORTFK0Qs9yxu0v+fPb42bcCrL/izomsa6CVOA+sVycGpd6PaNcUQhF+z/Xk5HhegWSn1ZrPTpw4eeKt/iHerJCehm4sWfLll18df+v0m//pZxVQFy9b24iCtX9i4ktO6lUmur8khxzCEQ7a7dl5/S+g5KZ43sDJpD58pviNL77PuHBy6LKA+gb31ZIlzTeW3Pzrxb/9l+jDXJ6glLZG5MN1E28dHZF6AZy+KbkJcSUnX0dKRq/4H4jVPKd0EQMZ/WToUkpKVsp/X/KO/ekYoP766yNgV9DYF4ODf41gPVeJWomrE1ePfjki1f3sTclRxfPfnVO6cGlGL3tTspBSvMNZWRmXv1ny1SmB9e9fDKb7Wb08aWtrihdVnImJb89flZqGFfuio4qK4x31tCYvx6Nm5fmW5+W9//WPS5bcehShfn37dtvn1wTW17zDLx46dLTK9w8MtUww2x0ZkTahA12Phdok+WPuX7gZY4bHxoZBvrbly39z586tW6Yjt04dOXKE82IcI/QSO7ito6NHQd8wqGnqu/bHrkapqUkT06xN++YUL1x2rg1D7Z+3zcv5fL47dx599NatGzdufPXDD7f/8d13wjxnpS/v0vffv/F96wuolRg6PJqeLvn+hlhTOFuES8czYE3eSV8ecuG84VN5eX9H3nvnDvz4n9u3gfWHAKugSS9CHQJgTGpqCme7S+jmL2AZ72RbHh+wY96svP/lWW/x0Xr79qmbt/f9Aml7gLUtPf3wYZSf9FJT090ws0KN2RduaGxO8cKkNk1WCskpi8vK+xqxPnrrxx9/EFmF9SazyNrqWw2oyKyNUnNKRLhClGsinHpO8cJEm71i0cnixn5YIrLyqMB6U2C1+1J4tba1HxbMKjk1MWFkfHSGWTquAav3MOdSEG2e9wMe9ccbt/7vn/9ErN6b5pZy/nDOpNginqoUzJreKDU1hYWr4LD6cMPG8wYEamyyFZTXuvXGj7xuqL+7+c1NxKqh1ciwZdiVc8uQnvP+bUjtdq/2VjJSU0q4EXVTtzWZ5g5tqmjGN+mD/6YjUHCg5JiYb47Qao6zYxqQXq+HSW67IEzPqDUau1rq+ouCDkMVYzO8DMWzwkJDobk3YYxGKmtYuAaapPBWaq6wZkWMSeLhjYgCc92/1RTc2pTcNkejnB1pPAqpnf/dENbgBA6/7gct3coaFsbJ7tMIb1boJeYmonJtC2KKyLhonteUfHd1F7op5sI42X06ZWvVEisFge7Klb669G5yU1NIJdVCXfWks+JdYaoX2snDoTKrpSYnG3+TAeDtUttDu0G0uOz0n/e1oK+vwhitxB7Rf7+QaDgEGzilb8GdFh6U2i41OQUuMYsWk7bAyZoL+Ipt2qPQS5vT+f00ekj6ra401C5cw2bj0o5w4OK9UaaJSCJg9gVceDwaaQfVbTOgELXiSccUuWBD1q6nJSViNzVDPPoNrzQ4FyordImSErFLuACSmv5uLzb+cjoKXZ2+QG+LYtcrJC3COA0zRqONpMCD0Rvcy2dreLGEqzFe6CoFbDqF7DObcUldonj9uYGM9b24KUM1qki9Ka2+OFhWKyB4skHm6KSmZrRTfIH8Vwqrzn+HqpjvcvMezi/z9MZ84+xIOG1fCzTN0y0T2BFr8KVGyqzObTCggKVmKChE73JuuBWxZmnn3rKiE+v1+mmdmAnfJ6GXQMO2uaqVhhkmMrrh1tZWYfEu5cosAc2s5lI7eGv0k3nUuR60zyR5Kcw35kP2JAL3ZJpGxHI/aErKsrhN3PWryrJRCsqOtj6du6rUji6wap4pTgl0RYdOo05JaYVkM7NPEr6xsSwRNX435i1dtarFA7Ce8uYp1lOvKivJNoEX5+bOsFJP0L2+U5O+YR+Ya7jXNnNpOjU5OcmjLo7jjT4zy8pKc7OBNTOzNHKIplVlmaW5GIO1ZJbHaiN0vmGwZ5ZvbHiYXz1PGRt+pj6mcenJ4eUC6uT9I0hWC/BkZtr15szM8sh0zKwqK8/NbNZjpZmZLdN/RO+YEHxZWYEYTGkdjsVKeH3CUYXFV+LZN5l5nmyopZmZzRH76LKyktzMFpPJnJtZPn1+WrssZYpitgiEL6VVRJ0dCKkqX5WZm+kx25ETR+4zrwLWUpPHBE4cY47DXVm2bHEEa4zyig+LSTheVtX6F7nV5WDXUrsZ/LQ5cgGczgYHz/XYwebl/k3RP83bvu05dPTnnB92+r8cQF0Wt1jVqkVpzOUAlAtRi6kjpdG3wPZc+NesETdN68s4x7W1X7mybRs64DVJ6EDaCKFteK/ov4vXxi9Wcf/oNR6ABct5NFNY1Roml99XGrJpSkXBtTRNg8l5afSc19vGRfks8de9yP7brrRztOAoNK2d+zPZgrD20tzcUnvU4Wn0zS25LdnqkJ1TYLU0LcYDvzv4NDosfBccx7/FHxfxOKcAF6XAaRoPvIoQoGgj9sX4sIDr0tOJd2V4X6zPkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZC1//D5QQ/2Am16QkAAAAAElFTkSuQmCC"></img>
              </div>
              <div className="cart-body-message">
                To access cart, please login
              </div>
            </div>
            <div className="cart-foot">
              <Link to="/authenticate">
                <button className="button3">Login</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Profile({ setProfile }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".profile-box").style.right = "0px";
    }, 10);
  }, []);

  function closeProfile(e) {
    if (
      e.target.className == "profile" &&
      e.target.className != "profile-box"
    ) {
      document.querySelector(".profile-box").style.right = "-400px";
      setTimeout(() => {
        setProfile(false);
      }, 300);
    }
  }

  const customer = useSelector((state) => state.customer.customer);
  return (
    <div
      className="profile"
      onClick={(e) => {
        closeProfile(e);
      }}
    >
      <div className="profile-box">
        <div className="profile-head">Hello, {customer.name.split(" ")[0]}</div>
        <div className="profile-body">
          <Link
            to="/account"
            onClick={() => {
              document.querySelector(".profile-box").style.right = "-400px";
              setTimeout(() => {
                setProfile(false);
              }, 300);
            }}
          >
            <div className="profile-item">
              <div>
                <i className="fa-solid fa-gear"></i>
              </div>
              <div>
                <div className="profile-item-title">Account Settings</div>
                <div className="profile-item-desc">
                  Edit name, update password
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="/myorders"
            onClick={() => {
              document.querySelector(".profile-box").style.right = "-400px";
              setTimeout(() => {
                setProfile(false);
              }, 300);
            }}
          >
            <div className="profile-item">
              <div>
                <i className="fa-solid fa-box"></i>
              </div>
              <div>
                <div className="profile-item-title">Your Orders</div>
                <div className="profile-item-desc">
                  Track orders, or buy things again
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="/deliverydetails"
            onClick={() => {
              document.querySelector(".profile-box").style.right = "-400px";
              setTimeout(() => {
                setProfile(false);
              }, 300);
            }}
          >
            <div className="profile-item">
              <div>
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <div className="profile-item-title">Delivery Details</div>
                <div className="profile-item-desc">
                  Edit address for delivery
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
