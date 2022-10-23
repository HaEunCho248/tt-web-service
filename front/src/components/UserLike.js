import React, { useState, useEffect, useCallback } from "react";
import { Button, Col } from "react-bootstrap";
import * as Api from "../../src/api";
import likeimg from "../images/userLiked/like.png";
import likedimg from "../images/userLiked/liked.png";
import "../styles/network/userLike.css";
function UserLike({ challengeId }) {
  const [likeImoticon, setLikeImoticon] = useState(false);
  const [countLike, setCountLike] = useState("0");
  // const myId = 1;
  const [myId,setMyid]=useState('')
  const [likeStatus, setLikeStatus] = useState(false);
  const [checkUserId, setCheckUserId] = useState("");
  useEffect(()=>{
    Api.get('currentUser').then((res)=>setMyid(res.data.userId))
  },[])
  useEffect(()=>{
    Api.get('liked').then((res)=>setCheckUserId(res.data))
  },[])
  useEffect(()=>{
    Api.get(`likedCount/${challengeId}`).then((res) =>
    setCountLike(res.data))
  },[countLike])
  // checkUserId.forEach((menu)=>console.log(menu))
  // console.log(checkUserId.array.forEach(x => {
  //   x.holdUserId === myId && setLikeStatus(true)
  // }))
  
  // console.log('asd',checkUserId.forEach(x=>{
  //   x.userId === 
  // }));
  // useEffect(()=>{
  //   checkUserId.forEach(x=>{
  //     x.userId === myId && setLikeStatus(true)
  //   })
  // },[])
  // useEffect(()=>{
  //   Api.post('liked').then((res)=>{
  //     likedId: likedId,
  //   })
  // })
  // useEffect(()=>{
  //   liked.forEach(x=>{
  //     x.userId === myId && setLike(true)
  //   })
  // },[])

  //   useEffect(() => {
  //     Api.get("users", likedId).then((res) =>
  //       setCountLike(res.data.likeCount)
  //     );
  //   }, [likedId]);

  //   useEffect(() => {
  //     Api.get("like", likedId).then((res) =>
  //       setLike(res.data.userStatus)
  //     );
  //   }, [likedId]);

  //   // const handleClick=useCallback(
  //   //   async (e) => {
  //   //     e.preventDefault();

  //   //     const res = await Api.put(`liked/${userId}`, {
  //   //       otherUserId: likedId,
  //   //     });
  //   //     setCountLike(res.data.likeCount);
  //   //     setLike(res.data.status);
  //   //   },
  //   //   [likedId, userId]
  //   // );
  //   const onDelete = () =>{
  //     console.log("del")
  //   }
  //   const onLike = () =>{
  //     console.log("like")
  //     let res = {lId:1, uId:1}
  //     setLikeId(res.lId)
  //   }
  //   const handleClick = () => {
  //     like? onDelete() : onLike()
  //     setLike(!like)
  //   };

  return (
    <div>
      <div
        onClick={() => {
          Api.post("liked", {
            challengeId,
          }).then((res) => setCheckUserId(res));
          Api.get(`likedCount/${challengeId}`).then((res) =>
            setCountLike(res.data)
          );
        }}
        id="userLike"
        className="likeButton"
      >
        {likeStatus ? <img src={likedimg} /> : <img src={likeimg} />}
        <span className="ms-2">{countLike} Likes</span>
      </div>
    </div>
  );
}

export default UserLike;
