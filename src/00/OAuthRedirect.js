import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthRedirect({ setLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthResponse = () => {
      const urlParams = new URLSearchParams(window.location.search);

      // 서버에서 전달된 URL 파라미터 추출
      const authToken = urlParams.get("authToken"); // JWT 토큰
      const memberId = urlParams.get("username"); // 사용자 ID
      const isSignUp = urlParams.get("signup") === "true"; // 회원가입 여부 확인

      // **수정된 부분: Authorization 헤더 파라미터 지원**
      // const authHeader = urlParams.get("Authorization"); // URL에 포함된 Authorization 헤더 가져오기
      // const jwtToken = authHeader?.replace("Bearer ", "").trim() || token;

      if (authToken) {
        // 로컬 스토리지에 토큰 및 사용자 정보 저장
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", memberId || "");
        localStorage.setItem("loggedIn", "true");

        setLoggedIn(true);

        if (isSignUp) {
          // 회원가입 후 처리
          alert("회원가입이 완료되었습니다! 환영합니다.");
        } else {
          // 기존 사용자: 회원 페이지로 이동
          alert("로그인 성공!");
          navigate("/member");
        }
      } else {
        // 오류 처리: 토큰이 없는 경우
        alert("OAuth 처리 실패: 서버에서 토큰이 전달되지 않았습니다.");
        navigate("/login"); // 로그인 페이지로 리다이렉트
      }
    };

    handleOAuthResponse();
  }, [setLoggedIn, navigate]);

  return (
    <div className="oauth-loading">
      <h1>OAuth 처리 중...</h1>
    </div>
  );
}

export default OAuthRedirect;
