import React, { useEffect, useState } from "react";
import NetworkCard from "../NetworkCard";
import * as Api from '../../api'
import { Col, Container, Row } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";

const ChallengeContent = ({myChallengeList}) => {
  
  const [visible, setVisible] = useState(4);
  const showMoreCards = () => {
    setVisible((preValue) => preValue + 4);
  };
  return (
    <Container>
      <Row>
        {myChallengeList.slice(0, visible).map((menu) => (
          <Col lg={3}
          key={menu.challangeId}>
            <NetworkCard item={menu} />
          </Col>
        ))}
      </Row>
      {visible < myChallengeList.length ? (
        <StyledButton
          id="showMore-btn"
          className="mt-3 mb-5"
          onClick={showMoreCards}
        >
          +
        </StyledButton>
      ) : null}
    </Container>
  );
};

export default ChallengeContent;
