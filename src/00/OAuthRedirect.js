import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthRedirect({ setLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthResponse = () => {
      // 서버에서 JWT 토큰 확인
      const authHeader = new URLSearchParams(window.location.search).get(
        "Authorization"
      );
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "").trim();
        localStorage.setItem("authToken", token);
        localStorage.setItem("loggedIn", "true");
        setLoggedIn(true);
        alert("OAuth 로그인 성공!");
        navigate("/member");
      } else {
        alert("OAuth 로그인 실패: 토큰을 찾을 수 없습니다.");
        navigate("/login");
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
