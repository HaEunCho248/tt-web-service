import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/mypage.css";
import UserEditForm from "./UserEditForm";
import * as Api from '../../api'
const UserCard = () => {
  const [name,setName]=useState('');
  const [password,setPassword]=useState('')
  useEffect(()=>{
    Api.get('currentUser').then((res)=>setName(res.data.name))
    Api.get('userImg').then((res)=>setProfileImage(res.data))
  },[])
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState("정보수정");
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
  );
  const fileInput=useRef(null);
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        Api.put('userImg',reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
      
    } else {
      setProfileImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
      );
      return;
    }
  };
  const onSubmit=(e)=>{
     //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("img", content);
    //     axios
    //         .post("http://localhost:3001/upload", formData)
    //         .then(res => {
    //             const { fileName } = res.data;
    //             console.log(fileName);
    //             setUploadedImg({ fileName });
    //             alert("The file is successfully uploaded");
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
  }
  
  return (
    <div className="userprofile">
      <form className="imageForm" onSubmit={onSubmit}>
      <img className="profileImage" src={profileImage} onClick={()=>{
        fileInput.current.click();
      }} />
      <input
      type='file'
      style={{display:'none'}}
      accept='image/jpg, image/png, image/jpeg'
      name="profileImage"
      onChange={onChangeImage}
      ref={fileInput}
      ></input>
      </form>
      <h2>{name}</h2>
      <StyledButton
        onClick={() => {
          showForm == true ? setShowForm(false) : setShowForm(true);
          showContent == "정보수정"
            ? setShowContent("취소하기")
            : setShowContent("정보수정");
        }}
      >
        {showContent}
      </StyledButton>
      {showForm == true ? <UserEditForm name={name} setName={setName} password={password} setPassword={setPassword} setShowForm={setShowForm}/> : null}
    </div>
  );
};

export default UserCard;
