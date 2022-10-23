import React from "react";
import NavBar from "../NavBar";
import "../../styles/mainpage/mainpage4.css";
import StyledButton from "../../styles/commonstyles/Button";
const MainPage4 = () => {
  return (
    <div className="mainPage4">
      <NavBar />
      <div className="mainPage4TextContainer">
        <h1>지구를 살리는 환경습관 기르기</h1>
        <div className="textBox">
          <h1>지금 당장</h1> <h1 className="missioncheck">✓미션체크로</h1>
        </div>
        <h1>시작하세요</h1>
      </div>
      <div className="buttonContainer">
        <StyledButton className="main4Btn">
          <h1>챌린지하러 가기</h1>
        </StyledButton>
      </div>
      <div className="footer">
        <a> 미션체크 created by 5늘</a>
        <a> 문의:whgkdms777@gmail.com</a>
      </div>
    </div>
  );
};

export default MainPage4;
