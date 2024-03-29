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
    {
      type: "Best deals on Mobile",
      data: mobiles,
      deviceType: "mobiles",
      poster:
        "https://m.media-amazon.com/images/W/MEDIAX_849526-T3/images/G/31/img22/Laptops/Smartchoice/Laptops/Header/Revised/sep_1500x300._CB595974029_.jpg",
    },
    {
      type: "Newly Launched Laptops",
      data: laptops,
      deviceType: "laptops",
      poster:
        "https://m.media-amazon.com/images/W/MEDIAX_849526-T3/images/G/31/img23/BAU-Dec/Laptops_Brand-Banners/Dell_Vostro14_3420_ELP_1500X300._CB570494119_.jpg",
    },
    {
      type: "Most productive Tablets",
      data: tablets,
      deviceType: "tablets",
      poster:
        "https://m.media-amazon.com/images/W/MEDIAX_849526-T3/images/G/31/img23/CEPC/MED/JAN/header/MED_PC_1500X300._CB584609942_.jpg",
    },
  ];
  return (
    <div className="home">
      <Poster />
      {/* -------------------------------------------------------------------------- */}
      <div className="group-card-section">
        <div className="group-card">
          <div className="group-card-head">Top Rated, Premium Quality</div>
          <div className="group-card-body">
            <Link to="laptops">
              <div className="group-card-body-item">
                <img src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305602/devices/bz6bt67q37gycd8fsfrc.jpg"></img>
                Laptops
              </div>
            </Link>
            <Link to="mobiles">
              <div className="group-card-body-item">
                <img src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670307073/devices/alee5r4xlgfukz6tgb6t.jpg"></img>
                Mobiles
              </div>
            </Link>
            <Link to="tablets">
              <div className="group-card-body-item">
                <img src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670306128/devices/tiwposycp8a5hgyk9ohp.jpg"></img>
                Tablets
              </div>
            </Link>
          </div>
        </div>
        {/* ---------------------------------------------------------------------- */}
        <div className="group-card">
          <div className="group-card-head">Enter the world of gaming</div>
          <Link
            to="/laptops/Dell/638ddf5fe7f6bc352d81f1e9"
            onClick={() => {
              dispatch(storeDevice());
            }}
          >
            <div className="group-card-body2">
              <img src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670305633/devices/mdbynycotrzzvrpjhuri.jpg"></img>
              Dell Alienware 17
            </div>
          </Link>
        </div>
        {/* -------------------------------------------------------------------------- */}
        {/* -------------------------------------------------------------------------- */}
        <div className="group-card">
          <div className="group-card-head">Shop Best Seller</div>
          <Link
            to="/mobiles/Apple/638dd9c2f1462464ea881205"
            onClick={() => {
              dispatch(storeDevice());
            }}
          >
            <div className="group-card-body2">
              <img src="https://res.cloudinary.com/dg1awjvew/image/upload/v1670306752/devices/lta82diahloq6imb69u9.jpg"></img>
              IPhone 14 Pro
            </div>
          </Link>
        </div>
        {/* ------------------------------------------------------------------------ */}
        <div className="group-card">
          <div className="group-card-head">Get Our Other Products</div>
          <div className="group-card-body2">
            <img src="https://play-lh.googleusercontent.com/VojafVZNddI6JvdDGWFrRmxc-prrcInL2AuBymsqGoeXjT4f9sv7KnetB-v3iLxk_Koi"></img>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------------------- */}

      {list.map((item) => (
        <>
          <div className="home-adv">
            <img src={item.poster} />
          </div>
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
        </>
      ))}
    </div>
  );
}
