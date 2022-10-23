import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

import MainPage from "./pages/MainPage";
import Network from "./pages/Network";
import LoginModal from "./components/LoginModal/LoginModal";
import SignUpModal from "./components/signUpModal/SignUpModal";
import ChallengeDetailModal from "./components/ChallengeDetailModal/ChallengeDetailModal";
import MyPage from "./pages/MyPage";
import CreateChallenge from "./pages/CreateChallengePage";
export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const handleStorageChange = async function () {
    let refreshToken = await localStorage.getItem("refreshToken");
    let accessToken = await sessionStorage.getItem("accessToken");
    console.log(accessToken);
    console.log(refreshToken);
    if (!refreshToken && !accessToken && userState.user) {
      dispatch({ type: "LOGOUT" });
      console.log("로그아웃함");
    } else if (refreshToken && userState.user != null) {
    }
  };
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      console.log("업데이트됌?");
      await Api.updateToken();
      console.log("토큰 업데이트 함");
      const res = await Api.get("currentUser");
      const currentUser = res.data;
      console.log(currentUser);

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    handleStorageChange();
    console.log("로딩");
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/network" exact element={<Network />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/login/signup" element={<SignUpModal />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route
              path="/network/pages/CreateChallengePage"
              element={<CreateChallenge />}
            />
            <Route path="/ChallengeDetail" element={<ChallengeDetailModal />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
