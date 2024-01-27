import React, { useState } from "react";
import "./poster.css";

export default function Poster() {
  const [posterPage, setPosterPage] = useState(1);

  function handleNextPage() {
    if (posterPage === 1) {
      setPosterPage(2);
      document.querySelector(".poster-page2").style.left = "0";
      document.querySelector(".poster-page1").style.left = "-100%";
      document.querySelector(".poster-page3").style.transition = "all 0s";
      document.querySelector(".poster-page3").style.left = "100%";
      setTimeout(() => {
        document.querySelector(".poster-page3").style.transition = "all 0.3s";
      }, 100);
    } else if (posterPage === 2) {
      setPosterPage(3);
      document.querySelector(".poster-page3").style.left = "0";
      document.querySelector(".poster-page2").style.left = "-100%";
      document.querySelector(".poster-page1").style.transition = "all 0s";
      document.querySelector(".poster-page1").style.left = "100%";
      setTimeout(() => {
        document.querySelector(".poster-page1").style.transition = "all 0.3s";
      }, 100);
    } else if (posterPage === 3) {
      setPosterPage(1);
      document.querySelector(".poster-page1").style.left = "0";
      document.querySelector(".poster-page3").style.left = "-100%";
      document.querySelector(".poster-page2").style.transition = "all 0s";
      document.querySelector(".poster-page2").style.left = "100%";
      setTimeout(() => {
        document.querySelector(".poster-page2").style.transition = "all 0.3s";
      }, 100);
    }
  }

  function handlePrevPage() {
    if (posterPage === 1) {
      setPosterPage(3);
      document.querySelector(".poster-page3").style.left = "0";
      document.querySelector(".poster-page1").style.left = "100%";
      document.querySelector(".poster-page2").style.transition = "all 0s";
      document.querySelector(".poster-page2").style.left = "-100%";
      setTimeout(() => {
        document.querySelector(".poster-page2").style.transition = "all 0.3s";
      }, 100);
    } else if (posterPage === 2) {
      setPosterPage(1);
      document.querySelector(".poster-page1").style.left = "0";
      document.querySelector(".poster-page2").style.left = "100%";
      document.querySelector(".poster-page3").style.transition = "all 0s";
      document.querySelector(".poster-page3").style.left = "-100%";
      setTimeout(() => {
        document.querySelector(".poster-page3").style.transition = "all 0.3s";
      }, 100);
    } else if (posterPage === 3) {
      setPosterPage(2);
      document.querySelector(".poster-page2").style.left = "0";
      document.querySelector(".poster-page3").style.left = "100%";
      document.querySelector(".poster-page1").style.transition = "all 0s";
      document.querySelector(".poster-page1").style.left = "-100%";
      setTimeout(() => {
        document.querySelector(".poster-page1").style.transition = "all 0.3s";
      }, 100);
    }
  }

  return (
    <div className="poster">
      <div
        className="poster-prev-btn"
        onClick={() => {
          handlePrevPage();
        }}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div className="poster-page1">
        <img src="https://m.media-amazon.com/images/I/61IT-3Pd+xL._SX3000_.jpg"></img>
      </div>
      <div className="poster-page2">
        <img src="https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_849526-T3/images/G/31/img24/MED/hero/25/s5/MED_PC_TallHero_1500x600._CB583217599_.jpg"></img>
      </div>
      <div className="poster-page3">
        <img src="https://m.media-amazon.com/images/W/MEDIAX_849526-T3/images/G/31/img23/BAU-Dec/Laptops_Brand-Banners/Dell_Vostro14_3420_ELP_1500X300._CB570494119_.jpg"></img>
      </div>
      <div
        className="poster-next-btn"
        onClick={() => {
          handleNextPage();
        }}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
      <div className="poster-gradient"></div>
    </div>
  );
}
