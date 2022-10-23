import React from "react";
import NavBar from "../NavBar";
import "../../styles/mainpage/mainpage3.css";
import Efforts from "../Charts/efforts";

const MainPage3 = () => {
  return (
    <div className="mainPage3">
      <NavBar />

      <div className="mainPage3GraphContainer">
        <Efforts />
        {/* <h1>미션체크는 달라진다는 사실을 데이터로 보여드립니다</h1> */}
      </div>
    </div>
  );
};

export default MainPage3;
