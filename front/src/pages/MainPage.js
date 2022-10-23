import React, { useState, useEffect, useReducer, createContext } from "react";
import FullpageContainer from "../styles/mainpage/FullPageContainer";
import MainPage1 from "../components/MainPage/MainPage1";
import MainPage2 from "../components/MainPage/MainPage2";
import MainPage3 from "../components/MainPage/MainPage3";
import styled from "styled-components";
import MainPage4 from "../components/MainPage/MainPage4";
import MainPage5 from "../components/MainPage/MainPage5";

const marginTop = styled.div`
  margin-top: 4rem;
`;
function MainPage() {
  return (
    <FullpageContainer>
      <marginTop>
        <div className="container1">
          <MainPage1 />
          <MainPage2 />
          <MainPage5 />
          <MainPage3 />
          <MainPage4 />
        </div>
      </marginTop>
    </FullpageContainer>
  );
}

export default MainPage;
