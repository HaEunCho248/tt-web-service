import React from "react";
import { useState } from "react";
import SignUpModal from "../signUpModal/SignUpModal";

const Modal = () => {
  //열기, 닫기를 부모로부터 받아옴
  const [modalOpen, setModalOpen] = useState(false);

  //회원가입 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    //모달이 열릴때 signUpModal 클래스가 생성됨
    <div>
      <button onClick={showModal}>회원가입버튼</button>
      {modalOpen && <SignUpModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Modal;
