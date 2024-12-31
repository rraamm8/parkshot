import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp1() {
  const handleOAuthSignUp = (provider) => {
    const oauthUrl = `http://local:8080/oauth2/authorization/${provider}`;
    window.location.href = oauthUrl; // OAuth 인증 URL로 이동
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">회원가입</h1>

      <div className="signup-buttons">
        <Link to="/signup2">
          <button className="signup-btn email">이메일로 회원가입 →</button>
        </Link>

        <button
          className="signup-btn naver"
          onClick={() => handleOAuthSignUp("naver")}
        >
          네이버로 회원 연동 →
        </button>
        <button
          className="signup-btn kakao"
          onClick={() => handleOAuthSignUp("kakao")}
        >
          카카오로 회원 연동 →
        </button>
        <button
          className="signup-btn google"
          onClick={() => handleOAuthSignUp("google")}
        >
          구글로 회원 연동 →
        </button>
      </div>
    </div>
  );
}

export default SignUp1;
