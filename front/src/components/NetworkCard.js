import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/network/networkcard.css";

import UserLike from "./UserLike";
const NetworkCard = ({ item }) => {
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;
  return (
    <Card
      id="cardBody"
      className="mb-3 ms-3 mr-5 card-body"
      style={{
        width: "16rem",
        borderRadius: "3%",
        border:
          new Date(item.fromDate) <= new Date(dateString)
            ? "none "
            : "2px solid #6A71E6",
        background:
          new Date(item.fromDate) <= new Date(dateString)
            ? "rgb(179, 176, 176, 0.6)"
            : "none",
      }}
    >
      <Card.Body>
        <div className="imageWrap">
          <Card.Img
            className="mb-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM79qhm5WWiW46jcsrREwPVX87kZygj9CQDw&usqp=CAU"
            alt="대표 사진"
          />

          <Card.Title>{item?.title}</Card.Title>

          <div className="cardtext">
            👨‍👧‍👧 100
            <UserLike challengeId={item.challengeId} />
          </div>
          <div className="duration">
            <a className="cardSubText">
              {item?.fromDate}-{item?.toDate}
            </a>{" "}
          </div>
          <button
            disabled={new Date(item.fromDate) <= new Date(dateString)}
            className="networkButton"
          >
            편집
          </button>
          <button
            className="networkButton"
            disabled={new Date(item.fromDate) <= new Date(dateString)}
          >
            삭제
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NetworkCard;
