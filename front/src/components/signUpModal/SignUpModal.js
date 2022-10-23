import React, { useEffect } from "react";
import { useState } from "react";
import "../../styles/signUpModal.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Close_round_light from "../../images/Close_round_light.png";

// import dubplicationCheckAPI from "./dubplicationCheckAPI";
import * as Api from "../../api";
import Swal from "sweetalert2";

function SignUpModal({ signUpModalOpen, setSignUpModalOpen }) {
  const navigate = useNavigate();
  
  // useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //use State로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 checkEmail 상태를 생성함 -> email 중복확인
  const [checkEmail, setCheckEmail] = useState(false);
  //useState로 pwd 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 checkPwd 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 checkBox 상태를 생성함.
  const [checkBox, setCheckBox] = useState(false);

  // const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  //email 인증메일로 받는거 해야함, 지금은 이메일 형태인지만 체크하고 있음
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  const validatePwd = (password) => {
    // 비밀번호 : 숫자+영문자+특수문자 조합으로 8자리 이상 입력
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
  };
  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  //이메일 중복 확인
  // const duplicationcemail = () => {
  //   dubplicationCheckAPI(email).then((res) => {
  //     if (res === false) {
  //       alert("사용 가능한 이메일입니다.");
  //       setEmail(res);
  //     } else {
  //       alert("중복된 이메일입니다. 다시 시도해주세요.");
  //       // setUsableEmail(res);
  //       setEmail("");
  //     }
  //   });
  // };
  // 비밀번호가 숫자+영문자+특수문자 조합으로 8자리 이상 입력 이상인지 여부를 확인함.
  const isPwdValid = validatePwd(password);
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPwdSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPwdValid && isPwdSame && isNameValid && checkBox;

  //   checkBox 체크
  const clickCheckedBox = () => {
    setCheckBox(true);
  };
  console.log(checkEmail)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = {};
    let user = {};
    try {
      
      // "user/register" 엔드포인트로 post요청함.
      res = await Api.post("register", {
        name,
        email,
        password,
        confirmPassword,
      });
      
      
      if(res.data=='이미 사용중인 email입니다.'){
        setCheckEmail(true);
        return;
      }else{
      setSignUpModalOpen(false);
      Swal.fire({
        position: "top-center",
        icon: "success",
        text: "회원가입 성공, 로그인 해주세요",
      }).then(function () {
        navigate("/", { replace: true });
      });}
    } catch (err) {
      Swal.fire({
        position: "top-center",
        icon: "fail",
        text: "회원가입 실패",
      }).then(function () {
        navigate("/", { replace: true });
      });
      console.log("회원가입에 실패하였습니다.", err);
    }
  };
  //모달창 끄기
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };
  useEffect(()=>{
    setCheckEmail(false)
  },[email])
  // console.log(setSignUpModalOpen);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="modalBackground">
          <div className="signUpModal">
            <div className="signUpModalContents">
              <img
                className="closeBtn"
                src={Close_round_light}
                setSignUpModalOpen={setSignUpModalOpen}
                onClick={closeSignUpModal}
                width="32px"
                height="32px"
              ></img>
              <span className="title">회원가입</span>
              <h3>이름</h3>
              <input
                placeholder="이름을 입력해 주세요"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              {!isNameValid && (
                <alert>이름은 2글자 이상으로 설정해 주세요.</alert>
              )}
              <h3>이메일</h3>
              <div className="emailBox">
                <input
                  className="emailInputBox"
                  placeholder="(예시) mission123@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              {!isEmailValid && <alert>이메일 형식이 올바르지 않습니다.</alert>}
              {
                checkEmail===true
                ?
                <alert>이미 가입된 이메일입니다.</alert>
                :
                null
              }
              <h3>비밀번호</h3>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              {!isPwdValid && (
                <alert>
                  숫자,영문자,특수문자 조합으로 8자리 이상 설정해 주세요.
                </alert>
              )}
              <h3>비밀번호 확인</h3>
              <input
                type="password"
                placeholder="비밀번호를 다시 한번 입력해 주세요."
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></input>
              {!isPwdSame && <alert>비밀번호가 일치하지 않습니다.</alert>}
              <div className="checkBoxContents">
                <input
                  type="checkBox"
                  className="checkBox"
                  onClick={clickCheckedBox}
                ></input>
                <span>개인정보 수집 및 이용 동의(필수)</span>
              </div>
              <button className="signUpBtn" disabled={!isFormValid}>
                회원가입하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpModal;
