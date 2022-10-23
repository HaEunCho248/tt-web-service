import React, { useState, useRef, forwardRef } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import sad from "../../images/createChallengePage/sad.png";
import badImg from "../../styles/createChallenge/BadImg.css";

const BadImg = ({ badImage, setBadImage }) => {
  const fileInput = useRef(null);
  const onChangeBadImage = (e) => {
    if (e.target.files[0]) {
      setBadImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setBadImage(blankImg);
      return;
    }
    //화면에 챌린지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      {
        /**reader.readyState === 2 -> 파일 로드 상태가 '완료'인지 확인 */
      }
      if (reader.readyState === 2) {
        setBadImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <div className="checkImgInner">
        <div className="checkImg">
          <div className="badImg">
            <span>
              <img className="icon" src={sad}></img>이렇게 찍으면 안돼요!
            </span>
            <img
              className="img"
              src={badImage}
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
              onChange={onChangeBadImage}
              ref={fileInput}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadImg;
