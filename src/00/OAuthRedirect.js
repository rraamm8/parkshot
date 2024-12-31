import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthRedirect({ setLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthResponse = () => {

      const urlParams = new URLSearchParams(window.location.search);

      // 기존 코드: 토큰과 회원 정보 파라미터 가져오기
      const token = urlParams.get("token"); // 서버에서 전달된 토큰
      const memberId = urlParams.get("memberId"); // 사용자 ID
      const isNewUser = urlParams.get("isNewUser"); // 신규 사용자 여부
      const isSignUp = urlParams.get("signup") === "true"; // 회원가입 여부 확인

      // **수정된 부분: Authorization 헤더 파라미터 지원**
      const authHeader = urlParams.get("Authorization"); // URL에 포함된 Authorization 헤더 가져오기
      const jwtToken = authHeader?.replace("Bearer ", "").trim() || token;

      if (jwtToken) {
        // 로컬 스토리지에 JWT 토큰 저장
        localStorage.setItem("authToken", jwtToken);
        localStorage.setItem("member_id", memberId || "");

        localStorage.setItem("loggedIn", "true");
        setLoggedIn(true);


        if (isSignUp || isNewUser === "true") {
          // 신규 사용자: 추가 정보 입력 단계로 이동
          alert("추가 정보가 필요합니다.");
          navigate("/signup3"); // SignUp3로 이동
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
