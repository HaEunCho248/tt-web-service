import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar/navbar.css";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import SignUpModal from "../components/signUpModal/SignUpModal";
import LoginModal from "./LoginModal/LoginModal";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { DispatchContext, UserStateContext } from "../App";
import ok from "../images/Ok.png";
import * as Api from "../api";
const NavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const [currentUserId, setCurrentUserId] = useState("");
  const isLogin = !!userState.user;
  
  const handleDelete = async (e) => {
    e.preventDefault();
    await Api.get("currentUser").then((res) => setCurrentUserId(res.data.userId));
    await Api.put(`withdrawal/${currentUserId}`, {
      withdrawal: 1,
    });

  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch({type:'LOGOUT'});
  alert('탈퇴 완료')

    navigate("/");
  };
  useEffect(()=>{
    Api.get('currentUser').then((res)=> setCurrentUserId(res.data.userId))
  },[])
  const navToggle = () => {
    active === "nav-menu"
      ? setActive("nav-menu nav-active")
      : setActive("nav-menu");

    toggleIcon === "nav-toggler"
      ? setToggleIcon("nav-toggler toggle")
      : setToggleIcon("nav-toggler");
  };

  const showSignUpModal = () => {
    setSignUpModalOpen(true);
    setLoginModalOpen(false);
  };
  //로그인 모달창 노출
  const showLoginModal = () => {
    setSignUpModalOpen(false);
    setLoginModalOpen(true);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: "LOGOUT" });
    alert("로그아웃 완료");
    navigate("/");
  };
  return (
    <div className="navBar">
      <nav className="nav">
        <a
          onClick={() => {
            navigate("/");
          }}
          className="nav-brand"
        >
          <img src={ok} className="logoSmall"></img>미션체크
        </a>
        <ul className={active}>
          <li className="nav-item">
            <a
              onClick={() => {
                navigate("/");
              }}
              className="nav-link"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                navigate("/mypage");
              }}
              href="#"
              className="nav-link"
            >
              MyPage
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                navigate("/network");
              }}
              className="nav-link"
            >
              Challenge
            </a>
          </li>
          {/* <li className="nav-item"><a href="#" className="nav-link">Login/Join</a></li> */}
          {isLogin === true ? (
            <>
              <NavDropdown
                className="navdropdown"
                title={<FontAwesomeIcon icon={faUser} />}
                id="basicNavDropdown"
              >
                <NavDropdown.Item className="dditem" href="#action/3.4">
                  <div onClick={handleDelete} className="dropdownFont">
                    회원탈퇴
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item href="/">
                  <div onClick={logout} className="dropdownFont">
                    로그아웃
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <NavDropdown
                className="navdropdown"
                title={<FontAwesomeIcon icon={faUser} />}
                id="basicNavDropdown"
              >
                {/* href="#action/3.4" */}

                <NavDropdown.Item className="dditem" onClick={showLoginModal}>
                  <div className="dropdownFont">로그인</div>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <div className="dropdownFont" onClick={showSignUpModal}>
                    회원가입
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {loginModalOpen && (
            <LoginModal setLoginModalOpen={setLoginModalOpen} />
          )}
          {signUpModalOpen && (
            <SignUpModal setSignUpModalOpen={setSignUpModalOpen} />
          )}
        </ul>
        <div onClick={navToggle} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
