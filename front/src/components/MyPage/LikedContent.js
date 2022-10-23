import React, { useEffect, useState } from "react";
import NetworkCard from "../NetworkCard";
import * as Api from "../../api";
import { Col, Container, Row } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";

const LikedContent = ({ likedList }) => {
  const [visible, setVisible] = useState(4);
  const showMoreCards = () => {
    setVisible((preValue) => preValue + 4);
  };
  // const myId = 1;
  // const [likedList, setLikedList] = useState([]);

  // useEffect(() => {
  //   let newArr = [];
  //   ChallengeList.forEach((x) => {
  //     x.liked.forEach((y) => {
  //       if (y.userId === myId) {
  //         newArr.push(x);
  //       }
  //     });
  //   });
  //   setLikedList(newArr);
  // }, [ChallengeList]);

  return (
    <Container>
      {likedList.length && (
        <Row>
          {likedList.slice(0, visible).map((menu) => (
            <Col lg={3} key={menu.challangeId}>
              <NetworkCard item={menu.challenge} />
            </Col>
          ))}
        </Row>
      )}
      {visible < likedList.length ? (
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

export default LikedContent;
