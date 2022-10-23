import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
const SortDropDown = ({originalData, data, setData}) => {
  const [initialState,setInitialState]=useState('정렬순서')
  var today=new Date();
  var year=today.getFullYear();
  var month=('0'+(today.getMonth()+1)).slice(-2);
  var day= ('0'+today.getDate()).slice(-2);
  var dateString= year + '-' + month + '-' + day;
  
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {initialState}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{
          setInitialState('최신순')
          const results=originalData.sort((item)=>
          item.createdAt).reverse()
        
          setData(results)
        }}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
          setInitialState('참여인원순')
          
        }}>참여인원순</Dropdown.Item> 
        <Dropdown.Item onClick={()=>{
          setInitialState('진행중인챌린지')
          const results= originalData.filter((item)=>
          new Date(item.toDate)>= new Date(dateString))
          setData(results)
        }}>진행중인 챌린지</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropDown;
