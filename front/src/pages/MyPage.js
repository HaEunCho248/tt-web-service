import React, { useContext, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ChallengeContent from "../components/MyPage/ChallengeContent";
import LikedContent from "../components/MyPage/LikedContent";
import PointContent from "../components/MyPage/PointContent";
import UserCard from "../components/MyPage/UserCard";
import NavBar from "../components/NavBar";
import "../styles/mypage/mypage.css";
import { DispatchContext, UserStateContext } from "../App";
import * as Api from "../api";
import { useNavigate } from "react-router-dom";
const MyPage = () => {
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;

  const [myPoint, setMyPoint] = useState(0);
  const navigate = useNavigate();
  const [initialState, setInitialState] = useState("골라서 보기");
  const [showDrop, setShowDrop] = useState(false);
  const [contents, setContents] = useState(1);
  const isLogin = !!userState.user;
  const [likedList, setLikedList] = useState([]);
  const [challengeData, setChallengeData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [myChallengeList, setMyChallengeList] = useState([]);

  useEffect(() => {
    Api.get("challenges").then((res) => setChallengeData(res.data.result));
    Api.get("challenges").then((res) => setOriginalData(res.data.result));
    Api.get(`point`).then((res) => setMyPoint(res.data.toString()));
    Api.get("liked").then((res) => setLikedList(res.data));
    Api.get("userToChallenge").then((res) => setMyChallengeList(res.data));
  }, []);

  return (
    <>
      {isLogin === true ? (
        <div className="myPage">
          <NavBar />
          <div className="myPageExceptNav">
            <UserCard />
            <div className="restPage">
              <div className="upperbar">
                <div
                  onClick={() => {
                    setContents(1);
                    setShowDrop(false);
                  }}
                  className="point"
                >
                  <h3>My Point</h3>
                  <h2>{myPoint}</h2>
                </div>
                <div
                  onClick={() => {
                    setContents(2);
                    setShowDrop(true);
                  }}
                  className="challange"
                >
                  <h3>My Challenge</h3>
                  <h2>{myChallengeList.length}</h2>
                </div>
                <div
                  onClick={() => {
                    setContents(3);
                    setShowDrop(false);
                  }}
                  className="liked"
                >
                  <h3>Liked</h3>
                  <h2>{likedList.length}</h2>
                </div>
              </div>
              <div className="btnContainer"></div>
              {showDrop == true ? (
                <Dropdown className="dropdownbtn">
                  <Dropdown.Toggle
                    className="dropdownToggle"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {initialState}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setInitialState("진행중");
                        let results = originalData.filter(
                          (item) =>
                            new Date(item.toDate) >= new Date(dateString)
                        );
                        console.log(results);
                        setChallengeData(results);
                      }}
                    >
                      진행중
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setInitialState("완료");
                        let results = originalData.filter(
                          (item) =>
                            new Date(item.toDate) <= new Date(dateString)
                        );

                        setChallengeData(results);
                      }}
                    >
                      완료
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setInitialState("내가 만든");
                      }}
                    >
                      내가 만든
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : null}

              <div className="contents">
                {contents === 1 && <PointContent />}
                {contents === 2 && (
                  <ChallengeContent myChallengeList={myChallengeList} />
                )}
                {contents === 3 && <LikedContent likedList={likedList} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default MyPage;
