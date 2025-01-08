import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function Login() {
  const handleOAuthLogin = async (provider) => {
    try {
      const oauthUrl = `http://localhost:8080/oauth2/authorization/${provider}`;
      // OAuth 인증 URL로 이동
      window.location.href = oauthUrl;
    } catch (error) {
      // 오류 발생 시
      console.error("OAuth 로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.href = "/login"; // /login 경로로 리다이렉트
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">로그인</h1>

      <div className="signup-buttons">
        <Link to="/login-input">
          <button className="signup-btn email">이메일로 로그인 →</button>
        </Link>

        <button
          className="signup-btn naver"
          onClick={() => handleOAuthLogin("naver")}
        >
          네이버로 로그인 →
        </button>
        <button
          className="signup-btn kakao"
          onClick={() => handleOAuthLogin("kakao")}
        >
          카카오로 로그인 →
        </button>
        <button
          className="signup-btn google"
          onClick={() => handleOAuthLogin("google")}
        >
          구글로 로그인 →
        </button>
      </div>
    </div>
  );
}

export default Login;
