import React from 'react'
import NavBar from '../NavBar';
import '../../styles/mainpage/mainpage3.css';
const MainPage3 = () => {
  return (
    <div className='mainPage3'>
      <NavBar/>
      <div className='mainPage3Title'>
        <h1>"나 한명 잘한다고 크게 달라질까?"</h1>
      </div>
      <div className='mainPage3GraphContainer'>
        <h1>이미지</h1>
        <h1>미션체크는 달라진다는 사실을 데이터로 보여드립니다</h1>
      </div>
    </div>
  )
}

export default MainPage3
