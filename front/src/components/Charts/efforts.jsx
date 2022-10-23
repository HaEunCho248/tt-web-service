import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      "년도":"2012",
      "대중교통을 이용하기":"46.4",
      "재활용품 분리하여 배출하기":"54.2",
      "음식물 쓰레기 줄이기":"35.2",
      "합성세제 사용 줄이기":"18.5",
      "일회용품 사용 줄이기":"19",
      "자연보호 및 환경보전활동 참여하기":"7.1",
      "친환경제품 구입·사용하기":"12.7",
      "물 절약하기":"0",
      "가정내 대기전력 줄이기":"0"
    },
    {
      "년도":"2014",
      "대중교통을 이용하기":"45.3",
      "재활용품 분리하여 배출하기":"53.7",
      "음식물 쓰레기 줄이기":"34.6",
      "합성세제 사용 줄이기":"18.7",
      "일회용품 사용 줄이기":"18",
      "자연보호 및 환경보전활동 참여하기":"8.3",
      "친환경제품 구입·사용하기":"11.7",
      "물 절약하기":"0",
      "가정내 대기전력 줄이기":"0"
    },
    {
      "년도":"2016",
      "대중교통을 이용하기":"47.3",
      "재활용품 분리하여 배출하기":"54.4",
      "음식물 쓰레기 줄이기":"36.9",
      "합성세제 사용 줄이기":"20.2",
      "일회용품 사용 줄이기":"25.6",
      "자연보호 및 환경보전활동 참여하기":"8.5",
      "친환경제품 구입·사용하기":"12",
      "물 절약하기":"23.4",
      "가정내 대기전력 줄이기":"29.9"
    },
    {
      "년도":"2018",
      "대중교통을 이용하기":"46.1",
      "재활용품 분리하여 배출하기":"54.4",
      "음식물 쓰레기 줄이기":"37.7",
      "합성세제 사용 줄이기":"17.5",
      "일회용품 사용 줄이기":"19.8",
      "자연보호 및 환경보전활동 참여하기":"7.4",
      "친환경제품 구입·사용하기":"12.4",
      "물 절약하기":"20.5",
      "가정내 대기전력 줄이기":"27"
    },
    {
      "년도":"2020",
      "대중교통을 이용하기":"48.3",
      "재활용품 분리하여 배출하기":"59.3",
      "음식물 쓰레기 줄이기":"41.9",
      "합성세제 사용 줄이기":"18.9",
      "일회용품 사용 줄이기":"29",
      "자연보호 및 환경보전활동 참여하기":"8.8",
      "친환경제품 구입·사용하기":"16.9",
      "물 절약하기":"22.6",
      "가정내 대기전력 줄이기":"28"
    }
    
  ]

const Efforts = () => {
  return (
    <>
    <ResponsiveContainer width="80%" aspect={3}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="년도" stroke='#000000'  />
        <YAxis stroke='#000000'/>
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey="대중교통을 이용하기" stroke="#ff0000"/>
        <Line type='monotone' dataKey="재활용품 분리하여 배출하기" stroke="#ffa500" />
        <Line type='monotone' dataKey="음식물 쓰레기 줄이기" stroke="#ffff00"/>
        <Line type='monotone' dataKey="합성세제 사용 줄이기" stroke="#008000"/>
        <Line type='monotone' dataKey="일회용품 사용 줄이기" stroke="#0000ff"/>
        <Line type='monotone' dataKey="자연보호 및 환경보전활동 참여하기" stroke="#000080" />
        <Line type='monotone' dataKey="친환경제품 구입·사용하기" stroke="#800080"/>
        <Line type='monotone' dataKey="물 절약하기" stroke="#00ffff" />
        <Line type='monotone' dataKey="가정내 대기전력 줄이기" stroke="#808080"/>

        
      </LineChart>
    </ResponsiveContainer>
    </>

    
    
  );
};
export default Efforts;
