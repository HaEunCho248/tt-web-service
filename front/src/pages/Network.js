import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import data from "../components/network/data";
import SearchForm from "../components/network/SearchForm";
import SortDropDown from "../components/network/SortDropDown";
import NetworkCard from "../components/NetworkCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/network/network.css";
import StyledButton from "../styles/commonstyles/Button";
import CreateChallengePage from "./CreateChallengePage";
import { useNavigate } from "react-router-dom";
import * as Api from "../api";

const Network = () => {
  const [challengeData, setChallengeData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(4);
  const showMoreCards = () => {
    setVisible((preValue) => preValue + 4);
  };
  const click = () => {
    document.location.href("/CreateChallengePage");
  };
  useEffect(() => {
    Api.get("challenges").then((res) =>
      setChallengeData(res.data.result.reverse())
    );
    Api.get("challenges").then((res) =>
      setOriginalData(res.data.result.reverse())
    );
  }, []);

  return (
    <div className="NetworkContainer">
      <NavBar />
      <div className="SearchFormContainer">
        <SearchForm
          originalData={originalData}
          data={challengeData}
          setData={setChallengeData}
        />
        <SortDropDown
          originalData={originalData}
          data={challengeData}
          setData={setChallengeData}
        />
      </div>
      <div className="challangePostButtonContainer">
        <button
          className="challangePostButton"
          onClick={() => {
            navigate("/network/pages/CreateChallengePage");
          }}
        >
          추가
        </button>
      </div>
      <Container className="forContainer">
        <Row>
          {challengeData.slice(0, visible).map((menu) => (
            <Col lg={3}>
              <NetworkCard item={menu} />
            </Col>
          ))}
        </Row>
        {visible < challengeData.length ? (
          <StyledButton
            id="showMore-btn"
            className="mt-3 mb-5"
            onClick={showMoreCards}
          >
            더보기
          </StyledButton>
        ) : null}
      </Container>
    </div>
  );
};

export default Network;
