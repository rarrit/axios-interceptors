import axios from "axios";


const TODO_API = axios.create({
  baseURL: "http://localhost:4000",  
})

TODO_API.interceptors.request.use(function (config){
  console.log("인터셉트 요청 성공!");
  return config;
});
TODO_API.interceptors.response.use(
  function (response) {
    console.log("인터셉트 응답 받았어요!");
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('인증되지 않았습니다! 로그인으로 리디렉션 중...');
          // 로그인 페이지로 리디렉션
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          console.log('리소스를 찾을 수 없습니다');
          break;
        case 500:
          console.log('서버오류');
          break;
        default:
          console.log('오류가 발생함!');
      }
    } else {
      // 응답이 없을 경우 네트워크 문제일 가능성
      console.log("네트워크 오류 또는 서버가 응답하지 않습니다.");
    }
    return Promise.reject(error);
  }
);




export default TODO_API;