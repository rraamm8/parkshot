import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function Login() {
  const handleOAuthLogin = (provider) => {
    const oauthUrl = `http://10.125.121.226:8080/oauth2/authorization/${provider}`;
    window.location.href = oauthUrl; // OAuth 인증 URL로 이동
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
