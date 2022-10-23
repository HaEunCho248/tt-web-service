import React, { useState } from "react";
import styled from "styled-components";
import challengeInfo from "../../styles/createChallenge/challengeInfo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { addDays } from "date-fns";
import { excludeDateIntervals } from "date-fns";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const ChallengeInfo = ({
  setTitle,
  setMethod,
  setDescription,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  const onStartDate = (data) => {
    setStartDate(data);
  };
  const onEndDate = (data) => {
    setEndDate(data);
  };

  return (
    <>
      <div className="inner">
        <span className="infoSpan">이름</span>
        <input
          className="infoInput"
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" ex) 주 1회 플로깅"
        ></input>
        <span className="infoSpan">인증방법</span>
        <input
          className="infoInput"
          onChange={(e) => setMethod(e.target.value)}
          placeholder=" ex) 쓰레기 봉투 인증"
        ></input>
        <span className="infoSpan">설명</span>

        <textarea
          className="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder=" 조깅을 하면서 쓰레기를 줍는 활동 "
        ></textarea>

        <span className="infoSpan">기간(시작일 ~ 종료일)</span>
        <div className="date">
          <label for="startDate"></label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            selectsStart
            handlerWeek={startDate}
            onChange={onStartDate}
            locale={ko}
            highlightDates={addDays(new Date(), 7)}
            minDate={new Date()}
          />

          <p className="dateRange">~</p>
          <label for="endDate"></label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            selectsEnd
            filterDate={(date) => {
              const day = date.getDay();

              const dayOfStartDay = startDate.getDay();

              if (dayOfStartDay === 0) {
                return day === 6;
              }

              return day === dayOfStartDay - 1;
            }}
            endDate={endDate}
            minDate={startDate}
            maxDate={addDays(startDate, 76)}
            onChange={onEndDate}
            locale={ko}
          />
        </div>
      </div>
    </>
  );
};

export default ChallengeInfo;
