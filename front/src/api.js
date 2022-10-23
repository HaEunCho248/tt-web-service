import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

//  async function updateToken(endpoint, refreshToken) {
//   if (localStorage.getItem("refreshToken")) {
//     let refreshedAccessTokenResponse = await axios.post(serverUrl + endpoint, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         refreshToken: localStorage.getItem("refreshToken"),
//       }),
//     });
//     let refreshAccessToken = await refreshedAccessTokenResponse.json();
//     if (refreshedAccessTokenResponse.Logout) {
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("accessToken");
//       window.location.reload();
//     } else {
//       sessionStorage.setItem("accessToken", refreshAccessToken.accessToken);
//     }
//   }
// }

async function updateToken() {
  if (localStorage.getItem("refreshToken")) {
    console.log('리프레쉬 존재함')
    let refreshedAccessTokenResponse = await fetch(serverUrl + 'liked', {
      method: "POST",
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken")
      }),
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem('accessToken')
      }
    });
    
    let refreshAccessToken = await refreshedAccessTokenResponse;
    let answer= await refreshAccessToken.text()
    if (refreshedAccessTokenResponse.Logout) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      window.location.reload();
    } else {
      await sessionStorage.setItem("accessToken", answer);
    }
  }
}

axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async (error) => {
    if (error.response.status === 490) {
      let refreshedAccessTokenResponse = await fetch(serverUrl + 'currentUser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });
      let refreshAccessToken = await refreshedAccessTokenResponse.json();
      if (refreshAccessToken.logout) {
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        window.location.reload();
      } else {
        await sessionStorage.setItem(
          "accessToken",
          refreshAccessToken.accessToken
        );
        await localStorage.setItem(
          "refreshToken",
          refreshAccessToken.refreshToken
        );
        let retryData = error.config;
        retryData.headers.Authorization = `Bearer ${refreshAccessToken.accessToken}`;
        return await axios.request(retryData);
      }
      return Promise.reject(error);
    }
  }
);
async function get(endpoint, params = "") {
  console.log(
    `%cGET 요청 ${serverUrl + endpoint + "/" + params}`,
    "color: #a25cd1;"
  );

  return axios.get(serverUrl + endpoint + "/" + params, {
    // access 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    }, //getItem('accessToken')으로 바꿔줘야함
  });
}

async function put(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    }, //getItem('accessToken')으로 바꿔줘야함
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "") {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    }, //getItem('accessToken')으로 바꿔줘야함
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete, updateToken };
//updateToken delete 옆 추가
