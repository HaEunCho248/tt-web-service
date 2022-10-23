import React, { useState, useRef } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import happy from "../../images/createChallengePage/happy.png";
import goodImg from "../../styles/createChallenge/GoodImg.css";
const GoodImg = ({ goodImage, setGoodImage }) => {
  const fileInput = useRef(null);
  const onChangeGoodImage = (e) => {
    if (e.target.files[0]) {
      console.log("e.target.files[0].filename", e.target.files[0]);
      console.log("e.target.files[0].name", e.target.files[0].name);
      setGoodImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setGoodImage({ blankImg });
      return;
    }
    //화면에 챌린지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setGoodImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <div className="checkImgInner">
        <div className="checkImg">
          <div className="goodImg">
            <span>
              <img className="icon" src={happy}></img>이렇게 찍어주세요!
            </span>
            <img
              className="img"
              src={goodImage}
              enctype="multipart/form-data"
              onClick={() => {
                fileInput.current.click();
              }}
            ></img>
            <input
              type="file"
              style={{ opacity: "0" }}
              accept="image/jpg, image/png, image/jpeg"
              name="explain"
              multiple
              onChange={onChangeGoodImage}
              ref={fileInput}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodImg;
