import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp1() {
  const handleOAuthSignUp = async (provider) => {
    try {
      const oauthUrl = `http://10.125.121.226:8080/oauth2/authorization/${provider}`;
      // OAuth 인증 URL로 이동
      window.location.href = oauthUrl;
    } catch (error) {
      // 오류 발생 시
      console.error("OAuth 회원가입 오류:", error);
      alert("회원 연동 중 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.href = "/signup1";
    }
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
