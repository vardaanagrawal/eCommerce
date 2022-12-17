import React, { useState } from "react";
import "./poster.css";
import poster1 from "../../../images/poster1.jpg";
import poster2 from "../../../images/poster2.jpg";
import poster4 from "../../../images/poster4.jpg";

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
        <img src="https://images-eu.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/31/img22/Wireless/Samsung/SamsungBAU/TheBigHolidaySale_dec/D66208672_IN_WLME_SamsungBAU_BigHolidaySale_15thDec_PC_1500x500.jpg"></img>
      </div>
      <div className="poster-page3">
        <img src="https://images-eu.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/31/img21/Wireless/katariy/Category_page/DEC_revamp/D64835888_WLD_OnePlus_Community_Sale_1500_1.jpg"></img>
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
