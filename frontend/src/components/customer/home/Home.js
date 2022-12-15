import React from "react";
import { useSelector } from "react-redux";
import "./home.css";
import ProductCard from "./ProductCard";
import LoadingCard from "./LoadingCard";
import Poster from "./Poster";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeDevice } from "../../../redux/actions/storeDevice";

export default function Home() {
  const dispatch = useDispatch();
  const mobiles = useSelector((state) => state.product.randomMobiles);
  const laptops = useSelector((state) => state.product.randomLaptops);
  const tablets = useSelector((state) => state.product.randomTablets);
  var list = [
    { type: "Best deals on Mobile", data: mobiles, deviceType: "mobiles" },
    { type: "Newly Launched Laptops", data: laptops, deviceType: "laptops" },
    { type: "Most productive Tablets", data: tablets, deviceType: "tablets" },
  ];
  return (
    <div className="home">
      <Poster />
      {/* -------------------------------------------------------------------------- */}
      {/* -------------------------------------------------------------------------- */}

      <div className="group-card-section">
        <div className="group-card">
          <div className="group-card-head">Top Rated, Premium Quality</div>
          <div className="group-card-body">
            <Link to="laptops">
              <div className="group-card-body-item">
                <img
                  src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305602/devices/bz6bt67q37gycd8fsfrc.jpg"
                  style={{ height: "100px" }}
                ></img>
                Laptops
              </div>
            </Link>
            <Link to="mobiles">
              <div className="group-card-body-item">
                <img
                  src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670307073/devices/alee5r4xlgfukz6tgb6t.jpg"
                  style={{ height: "100px" }}
                ></img>
                Mobiles
              </div>
            </Link>
            <Link to="tablets">
              <div className="group-card-body-item">
                <img
                  src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670306128/devices/tiwposycp8a5hgyk9ohp.jpg"
                  style={{ height: "100px" }}
                ></img>
                Tablets
              </div>
            </Link>
          </div>
        </div>
        {/* ---------------------------------------------------------------------- */}
        <div className="group-card">
          <div className="group-card-head">Enter the world of gaming</div>
          <Link to="/laptops/HP/638ddee4e7f6bc352d81f1e1" onClick={() => {
              dispatch(storeDevice());
            }}>
            <div
              className="group-card-body2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305633/devices/mdbynycotrzzvrpjhuri.jpg"
                style={{ width: "18vw" }}
              ></img>
              Dell Alienware 17
            </div>
          </Link>
        </div>
        {/* -------------------------------------------------------------------------- */}

        {/* <div
          style={{
            height: "100%",
            width: "48vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: "14vw",
              width: "14vw",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305602/devices/bz6bt67q37gycd8fsfrc.jpg"
              style={{ height: "130px" }}
            ></img>
            Mobiles
          </div>
          <div
            style={{
              height: "14vw",
              width: "14vw",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305602/devices/bz6bt67q37gycd8fsfrc.jpg"
              style={{ height: "130px" }}
            ></img>
            Mobiles
          </div>
          <div
            style={{
              height: "14vw",
              width: "14vw",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305602/devices/bz6bt67q37gycd8fsfrc.jpg"
              style={{ height: "130px" }}
            ></img>
            Mobiles
          </div>
        </div>

        {/* -------------------------------------------------------------------------- */}
        <div className="group-card">
          <div className="group-card-head">Shop Best Seller</div>
          <Link
            to="/mobiles/Apple/638dd9c2f1462464ea881205"
            onClick={() => {
              dispatch(storeDevice());
            }}
          >
            <div
              className="group-card-body2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670306752/devices/lta82diahloq6imb69u9.jpg"
                style={{ width: "18vw" }}
              ></img>
              IPhone 14 Pro
            </div>
          </Link>
        </div>
        {/* ------------------------------------------------------------------------ */}
        <div className="group-card">
          <div className="group-card-head">Get Our Other Products</div>
          <div
            className="group-card-body2"
            style={{ display: "grid", placeItems: "center" }}
          >
            <img
              src="https://play-lh.googleusercontent.com/VojafVZNddI6JvdDGWFrRmxc-prrcInL2AuBymsqGoeXjT4f9sv7KnetB-v3iLxk_Koi"
              style={{ height: "17vw" }}
            ></img>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------------- */}

      {list.map((item) => (
        <div className="product-row" key={item.type}>
          <div className="product-row-head">{item.type}</div>
          <div className="product-row-inner">
            {!item.data ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((a) => (
                  <LoadingCard key={a} />
                ))}
              </>
            ) : (
              item.data.map((items) => (
                <ProductCard
                  key={items._id}
                  item={items}
                  type={item.deviceType}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
