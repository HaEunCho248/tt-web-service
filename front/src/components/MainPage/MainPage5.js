import React from "react";
import NavBar from "../NavBar";
import "../../styles/mainpage/mainpage5.css";
import SeaLevel from "../Charts/SeaLevelGraph";
import Disasters from "../Charts/Disasters";
import styled from "styled-components";

// const TextColor = styled.div`
//   color: #de3803;
// `;

const MainPage5 = () => {
  return (
    <div className="mainpage5">
      <NavBar />
      <span className="disasterText">
        지구를 괴롭혔던 나의 습관 커다란 재난으로
      </span>
      <div className="graphContainer">
        <div className="graphDescription">
          {/* <span className="disasterText">
            내가 파괴 시킨 지구 나도 파괴하는 일 지구온난화 재해 발생 빈도가
            늘어나고 있다. 이에 따라 피해를 받는 수가 점점 늘어나고 있다.
          </span> */}
        </div>
        <Disasters />
      </div>
    </div>
  );
};

export default MainPage5;
