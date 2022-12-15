import React, { useState } from "react";
import "./poster.css";
import poster1 from "../../../images/poster1.jpg";

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
        <img src={poster1} style={{ width: "100%", marginTop: "110px" }}></img>
      </div>
      <div className="poster-page2">page2</div>
      <div className="poster-page3">page3</div>
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
